'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FounderBio from '../../components/FounderBio'
import PageCTA from '../../components/PageCTA'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-base text-gray-400">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="font-serif text-xl text-dark mb-3">Unable to Load Posts</h2>
          <p className="text-base text-gray-500 mb-4">Please check back later.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">Our Blog</h1>
        <p className="text-base md:text-lg text-gray-300">Insights and resources for your mental health journey</p>
      </div>

      <div className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base md:text-lg text-gray-400">No posts found. Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-all group">
                  <div className="aspect-[16/9] bg-cream overflow-hidden">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(post.tags || []).map((tag) => (
                        <span key={tag} className="text-xs bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h2 className="font-medium text-lg text-dark mb-2 group-hover:text-teal transition line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4">{post.excerpt || post.content.replace(/<[^>]+>/g, '').slice(0, 150)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="text-sm text-teal font-medium">Read More &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <FounderBio />
      <PageCTA />
    </>
  )
}
