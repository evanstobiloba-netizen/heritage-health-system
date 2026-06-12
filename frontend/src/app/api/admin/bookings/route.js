import { readJSON, requireAdmin } from '../../_lib/db'

export async function GET(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const bookings = readJSON('bookings.json')
  bookings.sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate) || a.appointmentTime.localeCompare(b.appointmentTime))
  return Response.json(bookings)
}
