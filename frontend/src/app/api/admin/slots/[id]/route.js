import { readJSON, writeJSON, requireAdmin } from '../../../_lib/db'

export async function DELETE(req, { params }) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  let slots = readJSON('slots.json')
  const idx = slots.findIndex((s) => s.id === params.id)
  if (idx === -1) return Response.json({ error: 'Slot not found.' }, { status: 404 })
  slots.splice(idx, 1)
  writeJSON('slots.json', slots)
  return Response.json({ success: true })
}
