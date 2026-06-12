'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function Admin() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [view, setView] = useState('dashboard')
  const [bookings, setBookings] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [newSlotDate, setNewSlotDate] = useState('')
  const [newSlotTime, setNewSlotTime] = useState('')
  const [batchStart, setBatchStart] = useState('')
  const [batchEnd, setBatchEnd] = useState('')
  const [message, setMessage] = useState(null)
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [postForm, setPostForm] = useState({ title: '', content: '', excerpt: '', image: '', tags: '', published: true })
  const [savingPost, setSavingPost] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('adminToken')
    if (saved) setToken(saved)
  }, [])

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }), [token])

  useEffect(() => {
    if (token) { fetchBookings(); fetchSlots(); fetchPosts() }
  }, [token])

  async function fetchBookings() {
    try { const res = await fetch('/api/admin/bookings', { headers: headers() }); if (res.ok) setBookings(await res.json()) } catch {}
  }
  async function fetchSlots() {
    try { const res = await fetch('/api/admin/slots', { headers: headers() }); if (res.ok) setSlots(await res.json()) } catch {}
  }
  async function fetchPosts() {
    try { const res = await fetch('/api/admin/posts', { headers: headers() }); if (res.ok) setPosts(await res.json()) } catch {}
  }

  async function handleLogin(e) {
    e && e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      if (!res.ok) { setLoginError('Invalid password.'); return }
      const data = await res.json()
      setToken(data.token)
      sessionStorage.setItem('adminToken', data.token)
    } catch { setLoginError('Connection error.') }
  }

  function logout() { setToken(''); sessionStorage.removeItem('adminToken'); setPassword('') }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 2500)
  }

  async function addSlot() {
    if (!newSlotDate || !newSlotTime) return
    try {
      const res = await fetch('/api/admin/slots', { method: 'POST', headers: headers(), body: JSON.stringify({ date: newSlotDate, time: newSlotTime }) })
      if (!res.ok) { const err = await res.json(); showMessage(`Error: ${err.error}`); return }
      setNewSlotDate(''); setNewSlotTime(''); showMessage('Slot added.'); fetchSlots()
    } catch { showMessage('Error adding slot.') }
  }

  async function generateSlots() {
    if (!batchStart || !batchEnd) return
    try {
      const res = await fetch('/api/admin/slots/generate', { method: 'POST', headers: headers(), body: JSON.stringify({ startDate: batchStart, endDate: batchEnd }) })
      if (!res.ok) { const err = await res.json(); showMessage(`Error: ${err.error}`); return }
      const data = await res.json()
      showMessage(`Generated ${data.added} slots.`)
      setBatchStart(''); setBatchEnd(''); fetchSlots()
    } catch { showMessage('Error generating slots.') }
  }

  async function deleteSlot(id) {
    try {
      const res = await fetch(`/api/admin/slots/${id}`, { method: 'DELETE', headers: headers() })
      if (res.ok) { showMessage('Slot deleted.'); fetchSlots() }
    } catch {}
  }

  async function updateBooking(bookingId, body) {
    try { await fetch(`/api/admin/bookings/${bookingId}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(body) }); fetchBookings() } catch {}
  }

  function renderFaxSheet(b) {
    const faxContent = `
HERITAGE HEALTH SYSTEM — INSURANCE VERIFICATION FAX
Fax to: (866) 437-5208

Provider Name: _____________         Date: ${new Date().toLocaleDateString()}

Patient Name: ${b.firstName} ${b.lastName}          DOB: ${b.dob}
Patient Address: ${b.address} ${b.city} ${b.state} ${b.zip}
Phone: ${b.phone}          Email: ${b.email}

Subscriber Name: ${b.subscriberName || `${b.firstName} ${b.lastName}`}          DOB: ${b.subscriberDob || b.dob}
Subscriber Address: ${b.subscriberAddress || `${b.address} ${b.city} ${b.state} ${b.zip}`}

Emergency Contact: ${b.emergencyName}          Phone: ${b.emergencyPhone}
Relationship: ${b.emergencyRelationship}

Primary Insurance: ${b.insuranceCarrier}          Policy #: ${b.policyNumber}
Secondary Insurance: ${b.secondaryInsuranceCarrier || 'N/A'}          Secondary Policy #: ${b.secondaryPolicyNumber || 'N/A'}

Provider Network Status: ${b.providerNetworkStatus || '_____________'}          Effective Date: ${b.effectiveDate || '_____________'}
Authorization #: ${b.authorizationNumber || '_____________'}          Ineligible: ${b.ineligible ? 'YES' : 'NO'}
Number of Visits: ${b.numberOfVisits || '_____________'}          Copay: ${b.copay || '_____________'}
Telehealth: ${b.telehealth ? 'YES' : 'NO'}          Ref#: ${b.refNumber || '_____________'}

THIS NOTICE IS NOT A GUARANTEE OF PAYMENT. BENEFITS ARE SUBJECT TO ALL CONTRACT LIMITS AND THE MEMBERS STATUS ON THE DATE OF SERVICE. ACCUMULATED AMOUNTS AS DEDUCTIBLE MAY CHANGE AS ADDITIONAL CLAIMS ARE PROCESSED.
`
    navigator.clipboard.writeText(faxContent)
    showMessage('Fax sheet copied to clipboard!')
  }

  async function savePost() {
    setSavingPost(true)
    try {
      const tags = postForm.tags ? postForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
      const body = { ...postForm, tags }
      const url = editingPost === 'new' ? '/api/admin/posts' : `/api/admin/posts/${editingPost.id}`
      const method = editingPost === 'new' ? 'POST' : 'PATCH'
      const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(body) })
      if (res.ok) {
        showMessage(editingPost === 'new' ? 'Post created!' : 'Post updated!')
        setEditingPost(null)
        setPostForm({ title: '', content: '', excerpt: '', image: '', tags: '', published: true })
        fetchPosts()
      } else {
        const err = await res.json()
        showMessage(err.error || 'Failed to save post')
      }
    } catch { showMessage('Failed to save post') }
    setSavingPost(false)
  }

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', headers: headers() })
      if (res.ok) { showMessage('Post deleted'); fetchPosts() }
    } catch { showMessage('Failed to delete post') }
  }

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h2 className="font-serif text-xl text-dark">Admin Access</h2>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 mb-4" />
            {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
            <button type="submit" className="w-full bg-teal text-white text-sm py-3 rounded-button font-semibold hover:bg-teal-dark transition">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      {message && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark text-white text-sm px-6 py-3 rounded-full shadow-lg z-50 animate-slide-up">
          {message}
        </div>
      )}

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {['dashboard', 'slots', 'bookings', 'blog'].map((t) => (
          <button key={t} onClick={() => setView(t)}
            className={`text-sm px-5 py-2.5 rounded-button transition ${view === t ? 'bg-teal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t === 'dashboard' ? 'Dashboard' : t === 'slots' ? 'Slot Management' : t === 'bookings' ? 'Bookings' : 'Blog'}
          </button>
        ))}
        <button onClick={logout} className="text-sm px-5 py-2.5 rounded-button transition text-gray-500 hover:text-red-500 ml-auto">Logout</button>
      </div>

      {view === 'dashboard' && (
        <div>
          <h2 className="font-serif text-2xl text-dark mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-teal mb-1">{bookings.length}</div>
              <div className="text-sm text-muted">Total Bookings</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-teal mb-1">{bookings.filter((b) => b.status === 'confirmed').length}</div>
              <div className="text-sm text-muted">Confirmed</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-teal mb-1">{slots.filter((s) => !s.booked).length}</div>
              <div className="text-sm text-muted">Available Slots</div>
            </div>
          </div>
        </div>
      )}

      {view === 'slots' && (
        <div>
          <h2 className="font-serif text-2xl text-dark mb-6">Slot Management</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium text-sm text-dark mb-4">Add Single Slot</h3>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Date</label>
                  <input type="date" value={newSlotDate} onChange={(e) => setNewSlotDate(e.target.value)}
                    className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Time</label>
                  <input type="time" value={newSlotTime} onChange={(e) => setNewSlotTime(e.target.value)}
                    className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                </div>
                <button onClick={addSlot} className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium hover:bg-teal-dark transition">Add Slot</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium text-sm text-dark mb-4">Batch Generate (Weekdays)</h3>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Start Date</label>
                  <input type="date" value={batchStart} onChange={(e) => setBatchStart(e.target.value)}
                    className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">End Date</label>
                  <input type="date" value={batchEnd} onChange={(e) => setBatchEnd(e.target.value)}
                    className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                </div>
                <button onClick={generateSlots} className="bg-green-dark text-white text-sm px-6 py-2.5 rounded-button font-medium hover:opacity-90 transition">Generate</button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {groupSlotsByDate(slots).map(({ date, dateSlots }) => (
              <div key={date} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-sm font-medium text-dark mb-3">{date}</div>
                <div className="flex flex-wrap gap-2">
                  {dateSlots.map((slot) => (
                    <div key={slot.id} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm ${!slot.booked ? 'bg-green/5 border-green/20 text-green-dark' : 'bg-red/5 border-red/200 text-red-500'}`}>
                      <span>{slot.time}</span>
                      <button onClick={() => deleteSlot(slot.id)} className="p-1 text-gray-400 hover:text-red-500 transition" title="Delete slot">&times;</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {slots.length === 0 && <p className="text-sm text-muted">No slots yet.</p>}
          </div>
        </div>
      )}

      {view === 'bookings' && (
        <div>
          <h2 className="font-serif text-2xl text-dark mb-6">Bookings</h2>
          {selectedBooking ? (
            <div>
              <button onClick={() => setSelectedBooking(null)}
                className="text-sm text-teal hover:text-teal-dark transition mb-4">&larr; Back to bookings</button>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'First Name', field: 'firstName' },
                    { label: 'Last Name', field: 'lastName' },
                    { label: 'DOB', field: 'dob' },
                    { label: 'Phone', field: 'phone' },
                    { label: 'Email', field: 'email' },
                    { label: 'Street', field: 'address' },
                    { label: 'City', field: 'city' },
                    { label: 'State', field: 'state' },
                    { label: 'Zip', field: 'zip' },
                    { label: 'Subscriber', field: 'subscriberName' },
                    { label: 'Insurance Carrier', field: 'insuranceCarrier' },
                    { label: 'Policy Number', field: 'policyNumber' },
                    { label: 'Secondary Carrier', field: 'secondaryInsuranceCarrier' },
                    { label: 'Secondary Policy', field: 'secondaryPolicyNumber' },
                    { label: 'Emergency Name', field: 'emergencyName' },
                    { label: 'Emergency Phone', field: 'emergencyPhone' },
                    { label: 'Emergency Relation', field: 'emergencyRelationship' },
                    { label: 'Date', field: 'appointmentDate' },
                    { label: 'Time', field: 'appointmentTime' },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">{label}</label>
                      <div className="px-4 py-2.5 border border-border rounded-xl text-sm bg-gray-50/30 text-gray-700">{selectedBooking[field] || ''}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Status</label>
                    <select defaultValue={selectedBooking.status || 'pending'}
                      onChange={(e) => updateBooking(selectedBooking.id, { status: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Provider Network Status</label>
                    <input type="text" defaultValue={selectedBooking.providerNetworkStatus || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { providerNetworkStatus: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Authorization #</label>
                    <input type="text" defaultValue={selectedBooking.authorizationNumber || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { authorizationNumber: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Copay</label>
                    <input type="text" defaultValue={selectedBooking.copay || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { copay: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Number of Visits</label>
                    <input type="text" defaultValue={selectedBooking.numberOfVisits || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { numberOfVisits: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Effective Date</label>
                    <input type="text" defaultValue={selectedBooking.effectiveDate || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { effectiveDate: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Reference #</label>
                    <input type="text" defaultValue={selectedBooking.refNumber || ''}
                      onBlur={(e) => updateBooking(selectedBooking.id, { refNumber: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Telehealth</label>
                    <input type="checkbox" defaultChecked={selectedBooking.telehealth || false}
                      onChange={(e) => updateBooking(selectedBooking.id, { telehealth: e.target.checked })}
                      className="mt-2 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Ineligible</label>
                    <input type="checkbox" defaultChecked={selectedBooking.ineligible || false}
                      onChange={(e) => updateBooking(selectedBooking.id, { ineligible: e.target.checked })}
                      className="mt-2 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Internal Notes</label>
                    <textarea defaultValue={selectedBooking.internalNotes || ''} rows={3}
                      onBlur={(e) => updateBooking(selectedBooking.id, { internalNotes: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex gap-3">
                  <button onClick={() => renderFaxSheet(selectedBooking)}
                    className="text-sm bg-gray-100 text-gray-700 px-5 py-2.5 rounded-button hover:bg-gray-200 transition">Copy Fax Sheet</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} onClick={() => setSelectedBooking(b)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-dark text-sm">{b.firstName} {b.lastName}</div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green/10 text-green-dark' : b.status === 'completed' ? 'bg-teal/10 text-teal-dark' : b.status === 'cancelled' ? 'bg-red/10 text-red-500' : 'bg-yellow/10 text-yellow-700'}`}>
                      {b.status || 'pending'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted">
                    <span>{b.appointmentDate} at {b.appointmentTime}</span>
                    <span>{b.phone}</span>
                    <span>{b.email}</span>
                  </div>
                </div>
              ))}
              {!bookings.length && <p className="text-sm text-muted">No bookings yet.</p>}
            </div>
          )}
        </div>
      )}

      {view === 'blog' && (
        <div>
          {editingPost ? (
            <div>
              <button onClick={() => { setEditingPost(null); setPostForm({ title: '', content: '', excerpt: '', image: '', tags: '', published: true }) }}
                className="text-sm text-teal hover:text-teal-dark transition mb-4">&larr; Back to posts</button>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-serif text-xl text-dark mb-6">{editingPost === 'new' ? 'New Post' : 'Edit Post'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Title *</label>
                    <input type="text" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Content (HTML) *</label>
                    <textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      rows={12} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Excerpt</label>
                    <textarea value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                      rows={3} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Image URL</label>
                    <input type="text" value={postForm.image} onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                      placeholder="https://..." className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px] mb-1 block">Tags (comma-separated)</label>
                    <input type="text" value={postForm.tags} onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                      placeholder="Anxiety, ADHD, Depression" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/20" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-gray-500 uppercase tracking-[0.5px]">Published</label>
                    <button onClick={() => setPostForm({ ...postForm, published: !postForm.published })}
                      className={`w-10 h-5 rounded-full transition ${postForm.published ? 'bg-teal' : 'bg-gray-300'} relative`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition ${postForm.published ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={savePost} disabled={savingPost || !postForm.title || !postForm.content}
                      className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium hover:bg-teal-dark transition disabled:opacity-50">
                      {savingPost ? 'Saving...' : editingPost === 'new' ? 'Create Post' : 'Update Post'}
                    </button>
                    <button onClick={() => { setEditingPost(null); setPostForm({ title: '', content: '', excerpt: '', image: '', tags: '', published: true }) }}
                      className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-dark">Blog Posts</h2>
                <button onClick={() => { setEditingPost('new'); setPostForm({ title: '', content: '', excerpt: '', image: '', tags: '', published: true }) }}
                  className="bg-teal text-white text-sm px-5 py-2.5 rounded-button font-medium hover:bg-teal-dark transition">New Post</button>
              </div>
              {posts.length === 0 ? (
                <p className="text-sm text-muted">No posts yet. Create your first blog post!</p>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-dark text-sm truncate">{post.title}</h3>
                          {!post.published && <span className="text-xs bg-yellow/10 text-yellow-700 px-2 py-0.5 rounded-full">Draft</span>}
                        </div>
                        <div className="text-xs text-muted">/{post.slug} &middot; {new Date(post.createdAt).toLocaleDateString()}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(post.tags || []).map((tag) => (
                            <span key={tag} className="text-xs bg-teal/10 text-teal-dark px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-teal hover:text-teal-dark transition">View</Link>
                        <button onClick={() => { setEditingPost(post); setPostForm({ title: post.title, content: post.content, excerpt: post.excerpt || '', image: post.image || '', tags: (post.tags || []).join(', '), published: post.published }) }}
                          className="text-xs text-gray-500 hover:text-teal transition">Edit</button>
                        <button onClick={() => deletePost(post.id)} className="text-xs text-gray-400 hover:text-red-500 transition">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function groupSlotsByDate(slots) {
  const map = {}
  slots.forEach((s) => {
    if (!map[s.date]) map[s.date] = []
    map[s.date].push(s)
  })
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, dateSlots]) => ({ date, dateSlots }))
}
