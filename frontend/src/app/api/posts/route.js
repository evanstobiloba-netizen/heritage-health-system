import { readJSON } from '../_lib/db'

export async function GET() {
  let posts = readJSON('posts.json')
  posts = posts.filter((p) => p.published !== false)
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return Response.json(posts)
}
