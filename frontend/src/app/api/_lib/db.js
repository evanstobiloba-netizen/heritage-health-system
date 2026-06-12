import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')

export function readJSON(file) {
  const p = join(DATA_DIR, file)
  if (!existsSync(p)) return []
  return JSON.parse(readFileSync(p, 'utf-8'))
}

export function writeJSON(file, data) {
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2))
}

export function requireAdmin(req) {
  const token = req.headers.get('authorization')
  const ADMIN_SECRET = process.env.ADMIN_SECRET || 'heritage-admin-2026'
  if (token !== `Bearer ${ADMIN_SECRET}`) {
    return false
  }
  return true
}

export function generateDaySlots(dateStr) {
  const slots = []
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
  times.forEach((time) => {
    slots.push({
      id: `${dateStr}-${time.replace(':', '')}`,
      date: dateStr,
      time,
      duration: 30,
      booked: false,
    })
  })
  return slots
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
