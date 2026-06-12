import { readJSON, writeJSON, requireAdmin, slugify } from '../../../_lib/db'

export async function PATCH(req, { params }) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const posts = readJSON('posts.json')
  const idx = posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return Response.json({ error: 'Post not found.' }, { status: 404 })

  const { title, content, excerpt, image, tags, published } = await req.json()
  if (title) {
    posts[idx].title = title
    posts[idx].slug = slugify(title)
  }
  if (content !== undefined) posts[idx].content = content
  if (excerpt !== undefined) posts[idx].excerpt = excerpt
  if (image !== undefined) posts[idx].image = image
  if (tags !== undefined) posts[idx].tags = tags
  if (published !== undefined) posts[idx].published = published
  posts[idx].updatedAt = new Date().toISOString()
  writeJSON('posts.json', posts)
  return Response.json(posts[idx])
}

export async function DELETE(req, { params }) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  let posts = readJSON('posts.json')
  const idx = posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return Response.json({ error: 'Post not found.' }, { status: 404 })
  posts.splice(idx, 1)
  writeJSON('posts.json', posts)
  return Response.json({ success: true })
}
