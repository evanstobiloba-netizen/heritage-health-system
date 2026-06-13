import nodemailer from 'nodemailer'

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

function buildEmailHtml(booking) {
  return `
<h2>New Patient Inquiry</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Patient Information</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Name</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.firstName} ${booking.lastName}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">DOB</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.dob}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Phone</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.phone}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Email</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.email}</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Address</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.address}${booking.city ? ', ' + booking.city : ''}${booking.state ? ', ' + booking.state : ''} ${booking.zip || ''}</td></tr>
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
  <tr><td style="padding:8px 12px;background:#f0f4f4;font-weight:600;border:1px solid #ddd;" colspan="2">Action Required</td></tr>
  <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:500;">Booking ID</td><td style="padding:6px 12px;border:1px solid #ddd;">${booking.id}</td></tr>
</table>
<p style="font-family:sans-serif;color:#666;font-size:12px;">This patient requires insurance verification before scheduling. Please review and contact them to set up an appointment.</p>
`.trim()
}

async function sendBookingEmail(booking) {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('SMTP not configured — skipping email for', booking.id)
    return
  }
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Heritage Health System" <noreply@heritagehealthsystem.com>',
      to: COMPANY_EMAIL,
      subject: `New Patient Inquiry — ${booking.firstName} ${booking.lastName}`,
      html: buildEmailHtml(booking),
    })
    console.log('Booking email sent for', booking.id)
  } catch (err) {
    console.error('Failed to send booking email:', err.message)
  }
}

export async function POST(req) {
  const body = await req.json()
  const {
    firstName, lastName, email, phone, dob,
    address, city, state, zip,
    subscriberName, subscriberDob, subscriberAddress,
    insuranceCarrier, policyNumber,
    secondaryInsuranceCarrier, secondaryPolicyNumber,
    emergencyName, emergencyPhone, emergencyRelationship,
  } = body

  if (!firstName || !lastName || !email || !phone || !dob) {
    return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }

  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    firstName, lastName, email, phone, dob,
    address: address || '', city: city || '', state: state || '', zip: zip || '',
    subscriberName: subscriberName || '',
    subscriberDob: subscriberDob || '',
    subscriberAddress: subscriberAddress || '',
    insuranceCarrier: insuranceCarrier || '',
    policyNumber: policyNumber || '',
    secondaryInsuranceCarrier: secondaryInsuranceCarrier || '',
    secondaryPolicyNumber: secondaryPolicyNumber || '',
    emergencyName: emergencyName || '',
    emergencyPhone: emergencyPhone || '',
    emergencyRelationship: emergencyRelationship || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  await sendBookingEmail(booking)

  return Response.json({ success: true, message: 'Your information has been submitted. We will contact you to schedule an appointment.' }, { status: 201 })
}
