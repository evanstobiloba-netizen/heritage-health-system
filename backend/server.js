import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BOOKINGS_FILE = join(__dirname, 'bookings.json')
const SLOTS_FILE = join(__dirname, 'slots.json')
const POSTS_FILE = join(__dirname, 'posts.json')
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'heritage-admin-2026'

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'info@heritagehealthsystem.com'

function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }
  return null
}

async function sendBookingEmail(booking) {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('SMTP not configured — skipping email notification for booking', booking.id)
    return
  }

  const dateStr = new Date(booking.appointmentDate + 'T' + (booking.appointmentTime || '12:00')).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  const timeStr = new Date(`2000-01-01T${booking.appointmentTime}:00`).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  })

  const html = `
<h2>New Appointment Booking</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Patient Information</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Name</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.firstName} ${booking.lastName}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">DOB</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.dob}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Phone</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.phone}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Email</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.email}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Address</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.address}${booking.city ? ', ' + booking.city : ''}${booking.state ? ', ' + booking.state : ''} ${booking.zip || ''}</td></tr>
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Appointment</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Date</td><td style="padding:6px 12px;border:1px solid #ddd;">${dateStr}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Time</td><td style="padding:6px 12px;border:1px solid #ddd;">${timeStr}</td></tr>
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Insurance</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Primary Carrier</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.insuranceCarrier || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Policy Number</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.policyNumber || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Secondary Carrier</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.secondaryInsuranceCarrier || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Secondary Policy</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.secondaryPolicyNumber || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Subscriber</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.subscriberName || 'Same as patient'}</td></tr>
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Emergency Contact</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Name</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.emergencyName || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Phone</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.emergencyPhone || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Relationship</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.emergencyRelationship || 'N/A'}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Booking ID</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.id}</td></tr>
</table>
<p style="font-family:sans-serif;color:#666;font-size:12px;">This booking requires insurance verification. Please review and contact the patient.</p>
`.trim()

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Heritage Health System" <noreply@heritagehealthsystem.com>',
      to: COMPANY_EMAIL,
      subject: `New Appointment Booking — ${booking.firstName} ${booking.lastName}`,
      html,
    })
    console.log('Booking email sent for', booking.id)
  } catch (err) {
    console.error('Failed to send booking email:', err.message)
  }
}

const app = express()
app.use(cors())
app.use(express.json())

function readJSON(file) {
  if (!existsSync(file)) return []
  return JSON.parse(readFileSync(file, 'utf-8'))
}

function writeJSON(file, data) {
  writeFileSync(file, JSON.stringify(data, null, 2))
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization
  if (token !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// ─── Slots ───────────────────────────────────────────────

function generateDaySlots(dateStr) {
  const slots = []
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
  times.forEach((time) => {
    slots.push({
      id: `${dateStr}-${time.replace(':','')}`,
      date: dateStr,
      time,
      duration: 30,
      booked: false,
    })
  })
  return slots
}

app.get('/api/slots', (req, res) => {
  let slots = readJSON(SLOTS_FILE)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const futureSlots = slots.filter((s) => new Date(s.date) >= now && !s.booked)
  futureSlots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  res.json(futureSlots)
})

app.get('/api/admin/slots', requireAdmin, (req, res) => {
  let slots = readJSON(SLOTS_FILE)
  slots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  res.json(slots)
})

app.post('/api/admin/slots', requireAdmin, (req, res) => {
  const { date, time } = req.body
  if (!date || !time) return res.status(400).json({ error: 'Date and time are required.' })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time))
    return res.status(400).json({ error: 'Invalid date or time format.' })
  let slots = readJSON(SLOTS_FILE)
  const id = `${date}-${time.replace(':','')}`
  if (slots.some((s) => s.id === id)) return res.status(409).json({ error: 'This slot already exists.' })
  const slot = { id, date, time, duration: 30, booked: false }
  slots.push(slot)
  writeJSON(SLOTS_FILE, slots)
  res.status(201).json(slot)
})

app.delete('/api/admin/slots/:id', requireAdmin, (req, res) => {
  let slots = readJSON(SLOTS_FILE)
  const idx = slots.findIndex((s) => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Slot not found.' })
  slots.splice(idx, 1)
  writeJSON(SLOTS_FILE, slots)
  res.json({ success: true })
})

app.post('/api/admin/slots/generate', requireAdmin, (req, res) => {
  const { startDate, endDate } = req.body
  let existing = readJSON(SLOTS_FILE)
  const existingIds = new Set(existing.map((s) => s.id))
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return res.status(400).json({ error: 'Invalid date range.' })
  const added = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const dateStr = d.toISOString().slice(0, 10)
    const daySlots = generateDaySlots(dateStr)
    daySlots.forEach((slot) => {
      if (!existingIds.has(slot.id)) {
        existing.push(slot)
        existingIds.add(slot.id)
        added.push(slot)
      }
    })
  }
  writeJSON(SLOTS_FILE, existing)
  res.status(201).json({ added: added.length, slots: added })
})

// ─── Bookings ────────────────────────────────────────────

app.post('/api/bookings', (req, res) => {
  const {
    firstName, lastName, email, phone, dob,
    address, city, state, zip,
    subscriberName, subscriberDob, subscriberAddress,
    insuranceCarrier, policyNumber,
    secondaryInsuranceCarrier, secondaryPolicyNumber,
    emergencyName, emergencyPhone, emergencyRelationship,
    slotId,
  } = req.body

  if (!firstName || !lastName || !email || !phone || !dob || !slotId) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  let slots = readJSON(SLOTS_FILE)
  const slot = slots.find((s) => s.id === slotId)
  if (!slot) return res.status(404).json({ error: 'This time slot is no longer available.' })
  if (slot.booked) return res.status(409).json({ error: 'This time slot has just been booked.' })

  slot.booked = true
  writeJSON(SLOTS_FILE, slots)

  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),

    // Patient info
    firstName, lastName, email, phone, dob,
    address: address || '', city: city || '', state: state || '', zip: zip || '',

    // Subscriber info
    subscriberName: subscriberName || '',
    subscriberDob: subscriberDob || '',
    subscriberAddress: subscriberAddress || '',

    // Primary insurance
    insuranceCarrier: insuranceCarrier || '',
    policyNumber: policyNumber || '',

    // Secondary insurance
    secondaryInsuranceCarrier: secondaryInsuranceCarrier || '',
    secondaryPolicyNumber: secondaryPolicyNumber || '',

    // Emergency contact
    emergencyName: emergencyName || '',
    emergencyPhone: emergencyPhone || '',
    emergencyRelationship: emergencyRelationship || '',

    // Appointment
    slotId,
    appointmentDate: slot.date,
    appointmentTime: slot.time,
    status: 'pending',

    // Internal (admin-only fields, set by clinic after booking)
    providerName: '',
    providerNetworkStatus: '',
    effectiveDate: '',
    authorizationNumber: '',
    numberOfVisits: '',
    copay: '',
    telehealth: false,
    refNumber: '',
    ineligible: false,
    internalNotes: '',

    createdAt: new Date().toISOString(),
  }

  const bookings = readJSON(BOOKINGS_FILE)
  bookings.push(booking)
  writeJSON(BOOKINGS_FILE, bookings)

  sendBookingEmail(booking)

  res.status(201).json({
    success: true,
    message: 'Your appointment has been booked! Insurance verification is in progress.',
    booking,
  })
})

app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  const bookings = readJSON(BOOKINGS_FILE)
  bookings.sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate) || a.appointmentTime.localeCompare(b.appointmentTime))
  res.json(bookings)
})

app.patch('/api/admin/bookings/:id', requireAdmin, (req, res) => {
  const allowedFields = [
    'status', 'providerName', 'providerNetworkStatus', 'effectiveDate',
    'authorizationNumber', 'numberOfVisits', 'copay', 'telehealth',
    'refNumber', 'ineligible', 'internalNotes',
  ]
  const bookings = readJSON(BOOKINGS_FILE)
  const booking = bookings.find((b) => b.id === req.params.id)
  if (!booking) return res.status(404).json({ error: 'Booking not found.' })

  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      booking[key] = req.body[key]
    }
  }
  writeJSON(BOOKINGS_FILE, bookings)
  res.json(booking)
})

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_SECRET) {
    res.json({ token: ADMIN_SECRET })
  } else {
    res.status(401).json({ error: 'Invalid password.' })
  }
})

// ─── Blog Posts ──────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

app.get('/api/posts', (req, res) => {
  let posts = readJSON(POSTS_FILE)
  posts = posts.filter((p) => p.published !== false)
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json(posts)
})

app.get('/api/posts/:id', (req, res) => {
  const posts = readJSON(POSTS_FILE)
  const post = posts.find((p) => p.id === req.params.id || p.slug === req.params.id)
  if (!post) return res.status(404).json({ error: 'Post not found.' })
  res.json(post)
})

app.get('/api/admin/posts', requireAdmin, (req, res) => {
  let posts = readJSON(POSTS_FILE)
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json(posts)
})

app.post('/api/admin/posts', requireAdmin, (req, res) => {
  const { title, content, excerpt, image, tags, published } = req.body
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required.' })
  let posts = readJSON(POSTS_FILE)
  let slug = slugify(title)
  let slugSuffix = 0
  while (posts.some((p) => p.slug === slug && p.id !== req.body.id)) {
    slugSuffix++
    slug = slugify(title) + '-' + slugSuffix
  }
  const post = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    slug,
    content,
    excerpt: excerpt || content.replace(/<[^>]+>/g, '').slice(0, 200),
    image: image || '',
    tags: tags || [],
    published: published !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts.push(post)
  writeJSON(POSTS_FILE, posts)
  res.status(201).json(post)
})

app.patch('/api/admin/posts/:id', requireAdmin, (req, res) => {
  const posts = readJSON(POSTS_FILE)
  const idx = posts.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Post not found.' })
  const { title, content, excerpt, image, tags, published } = req.body
  if (title) {
    posts[idx].title = title
    posts[idx].slug = slugify(title)
  }
  if (content !== undefined) posts[idx].content = content
  if (excerpt !== undefined) posts[idx].excerpt = excerpt
  if (image !== undefined) posts[idx].image = image
  if (tags !== undefined) posts[idx].tags = tags
  if (published !== undefined) posts[idx].published = published
  posts[idx].updatedAt = new Date().toISOString()
  writeJSON(POSTS_FILE, posts)
  res.json(posts[idx])
})

app.delete('/api/admin/posts/:id', requireAdmin, (req, res) => {
  let posts = readJSON(POSTS_FILE)
  const idx = posts.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Post not found.' })
  posts.splice(idx, 1)
  writeJSON(POSTS_FILE, posts)
  res.json({ success: true })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Heritage Health backend running on http://localhost:${PORT}`)
})
