import { readJSON, writeJSON, requireAdmin, slugify } from '../../_lib/db'

export async function GET(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  let posts = readJSON('posts.json')
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return Response.json(posts)
}

export async function POST(req) {
  if (!requireAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, content, excerpt, image, tags, published } = await req.json()
  if (!title || !content) return Response.json({ error: 'Title and content are required.' }, { status: 400 })

  let posts = readJSON('posts.json')
  let slug = slugify(title)
  let slugSuffix = 0
  while (posts.some((p) => p.slug === slug)) {
    slugSuffix++
    slug = slugify(title) + '-' + slugSuffix
  }
  const post = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title, slug,
    content,
    excerpt: excerpt || content.replace(/<[^>]+>/g, '').slice(0, 200),
    image: image || '',
    tags: tags || [],
    published: published !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts.push(post)
  writeJSON('posts.json', posts)
  return Response.json(post, { status: 201 })
}
