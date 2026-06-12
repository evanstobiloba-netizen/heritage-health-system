import { readJSON, writeJSON, requireAdmin } from '../../../_lib/db'

export async function PATCH(req, { params }) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const allowedFields = [
    'status', 'providerName', 'providerNetworkStatus', 'effectiveDate',
    'authorizationNumber', 'numberOfVisits', 'copay', 'telehealth',
    'refNumber', 'ineligible', 'internalNotes',
  ]
  const bookings = readJSON('bookings.json')
  const booking = bookings.find((b) => b.id === params.id)
  if (!booking) return Response.json({ error: 'Booking not found.' }, { status: 404 })

  const body = await req.json()
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      booking[key] = body[key]
    }
  }
  writeJSON('bookings.json', bookings)
  return Response.json(booking)
}
