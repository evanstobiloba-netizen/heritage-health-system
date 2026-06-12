import { readJSON, writeJSON, requireAdmin, generateDaySlots } from '../../../_lib/db'

export async function POST(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { startDate, endDate } = await req.json()
  let existing = readJSON('slots.json')
  const existingIds = new Set(existing.map((s) => s.id))
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return Response.json({ error: 'Invalid date range.' }, { status: 400 })

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
  writeJSON('slots.json', existing)
  return Response.json({ added: added.length, slots: added }, { status: 201 })
}
