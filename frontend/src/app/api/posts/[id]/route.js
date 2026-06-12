import { readJSON } from '../../_lib/db'

export async function GET(req, { params }) {
  const posts = readJSON('posts.json')
  const post = posts.find((p) => p.id === params.id || p.slug === params.id)
  if (!post) return Response.json({ error: 'Post not found.' }, { status: 404 })
  return Response.json(post)
}
