'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import FounderBio from '../../../components/FounderBio'
import PageCTA from '../../../components/PageCTA'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found')
        return res.json()
      })
      .then((data) => { setPost(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-base text-gray-400">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="font-serif text-xl text-dark mb-3">Post Not Found</h2>
          <p className="text-base text-gray-500 mb-6">The blog post you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-button inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-teal-light hover:text-teal transition mb-4 inline-block">&larr; Back to Blog</Link>
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="text-xs bg-teal/15 text-teal-light px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">{post.title}</h1>
          <div className="text-sm text-teal-light/70">
            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full h-auto" loading="lazy" />
            </div>
          )}
          <div className="prose-custom text-base md:text-lg text-gray-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

      <div className="px-6 md:px-12 pb-12">
        <div className="max-w-3xl mx-auto border-t border-border pt-8 flex justify-between items-center">
          <Link href="/blog" className="text-sm text-teal hover:text-teal-dark transition">&larr; Back to Blog</Link>
          <Link href="/contact" className="bg-teal text-white text-sm px-6 py-3 rounded-button inline-block text-center w-full sm:w-auto">
            Book an Appointment
          </Link>
        </div>
      </div>

      <FounderBio />
      <PageCTA />
    </>
  )
}
