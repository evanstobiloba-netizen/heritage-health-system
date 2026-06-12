import { readJSON } from '../_lib/db'

export async function GET() {
  let slots = readJSON('slots.json')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const futureSlots = slots.filter((s) => new Date(s.date) >= now && !s.booked)
  futureSlots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  return Response.json(futureSlots)
}
