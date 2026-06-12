import { readJSON, writeJSON, requireAdmin } from '../../_lib/db'

export async function GET(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  let slots = readJSON('slots.json')
  slots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  return Response.json(slots)
}

export async function POST(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { date, time } = await req.json()
  if (!date || !time) return Response.json({ error: 'Date and time are required.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time))
    return Response.json({ error: 'Invalid date or time format.' }, { status: 400 })

  let slots = readJSON('slots.json')
  const id = `${date}-${time.replace(':', '')}`
  if (slots.some((s) => s.id === id)) return Response.json({ error: 'This slot already exists.' }, { status: 409 })

  const slot = { id, date, time, duration: 30, booked: false }
  slots.push(slot)
  writeJSON('slots.json', slots)
  return Response.json(slot, { status: 201 })
}
