const ADMIN_SECRET = process.env.ADMIN_SECRET || 'heritage-admin-2026'

export async function POST(req) {
  const { password } = await req.json()
  if (password === ADMIN_SECRET) {
    return Response.json({ token: ADMIN_SECRET })
  }
  return Response.json({ error: 'Invalid password.' }, { status: 401 })
}
