'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STEPS = ['Patient Info', 'Insurance', 'Emergency Contact', 'Pick Date']

function monthNames() { return ['January','February','March','April','May','June','July','August','September','October','November','December'] }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function firstDay(y, m) { return new Date(y, m, 1).getDay() }
function fmtDate(y, m, d) { return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` }

function parseSlotId(slotId) {
  const [datePart, timePart] = slotId.split('-')
  const d = new Date(`${datePart.slice(0,4)}-${datePart.slice(5,7)}-${datePart.slice(8,10)}T${timePart.slice(0,2)}:${timePart.slice(2)}:00`)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }) + ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', phone: '', dob: '',
  address: '', city: '', state: '', zip: '',
  subscriberName: '', subscriberDob: '', subscriberAddress: '',
  insuranceCarrier: '', policyNumber: '',
  secondaryInsuranceCarrier: '', secondaryPolicyNumber: '',
  emergencyName: '', emergencyPhone: '', emergencyRelationship: '',
  hipaaConsent: false,
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [status, setStatus] = useState('idle')
  const [bookingResult, setBookingResult] = useState(null)

  useEffect(() => { fetchSlots() }, [])

  async function fetchSlots() {
    try {
      const res = await fetch('/api/slots')
      if (res.ok) setSlots(await res.json())
    } catch {}
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function canContinue() {
    if (step === 1) return form.firstName && form.lastName && form.email && form.phone && form.dob && form.hipaaConsent
    if (step === 2) return true
    if (step === 3) return form.emergencyName && form.emergencyPhone && form.emergencyRelationship
    if (step === 4) return selectedSlot !== null
    return true
  }

  function nextStep() { if (canContinue()) setStep((s) => Math.min(s + 1, 4)) }
  function prevStep() { setStep((s) => Math.max(s - 1, 1)) }

  async function handleSubmit() {
    if (!canContinue()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slotId: selectedSlot }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Something went wrong.') }
      const result = await res.json()
      setBookingResult(result.booking)
      setStatus('success')
      setStep(4)
    } catch { setStatus('error') }
  }

  function resetForm() {
    setForm(INITIAL_FORM)
    setSelectedSlot(null)
    setBookingResult(null)
    setStatus('idle')
    setStep(1)
  }

  const availableDates = [...new Set(slots.map((s) => s.date))].sort()
  const today = new Date(); today.setHours(0, 0, 0, 0)

  function isDateAvailable(day) { return availableDates.includes(fmtDate(calYear, calMonth, day)) }
  function isDateInPast(day) { return new Date(calYear, calMonth, day) < today }
  function slotsForDate(dateStr) { return slots.filter((s) => s.date === dateStr).sort((a, b) => a.time.localeCompare(b.time)) }

  function StepIndicator() {
    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              i + 1 === step ? 'bg-teal text-white' :
              i + 1 < step ? 'bg-green/20 text-green-dark' :
              'bg-gray-100 text-gray-400'
            }`}>
              {i + 1 < step ? (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i + 1 === step ? 'text-teal font-medium' : 'text-gray-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className="w-4 sm:w-6 h-px bg-gray-200 mx-0.5 sm:mx-1 hidden sm:block" />}
          </div>
        ))}
      </div>
    )
  }

  if (step === 4 && status === 'success' && bookingResult) {
    return (
      <div className="bg-green/5 border border-green/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-dark mb-1">Appointment Booked!</h3>
        <p className="text-sm text-gray-500 mb-5">Your appointment has been scheduled successfully.</p>
        <div className="bg-white border border-border rounded-lg p-5 text-left text-sm space-y-2 mb-5">
          <p><strong>Date:</strong> {parseSlotId(bookingResult.slotId)}</p>
          <p><strong>Provider:</strong> Dr. Olubunmi Olawale</p>
          <p><strong>Location:</strong> 21 Mayor Thomas J McGrath Hwy, Unit 306, Quincy, MA</p>
          <p><strong>Patient:</strong> {bookingResult.firstName} {bookingResult.lastName}</p>
          <p><strong>Insurance:</strong> {bookingResult.insuranceCarrier || 'N/A'} {bookingResult.policyNumber ? `(Policy: ${bookingResult.policyNumber})` : ''}</p>
        </div>
        <div className="bg-teal/5 border border-teal/10 rounded-lg p-4 text-left text-sm text-gray-600 space-y-2 mb-5">
          <p><strong>What happens next?</strong></p>
          <p>&bull; Your insurance information is being verified.</p>
          <p>&bull; We will confirm your coverage before your appointment date.</p>
          <p>&bull; Need to reschedule? Call us at (781) 742-0834.</p>
        </div>
        <button onClick={resetForm} className="text-sm text-teal hover:text-teal-dark underline">Book another appointment</button>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator />

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-700">
          Something went wrong. Please try again or call us at (781) 742-0834.
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="font-serif text-lg text-dark mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="sr-only" htmlFor="firstName">Patient First Name</label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Patient First Name *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="lastName">Patient Last Name</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Patient Last Name *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
          </div>
          <div className="mb-3">
            <label className="sr-only" htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} required placeholder="Date of Birth *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
          </div>
          <div className="mb-3">
            <label className="sr-only" htmlFor="address">Patient Address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="sr-only" htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="state">State</label>
              <input id="state" name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="zip">ZIP</label>
              <input id="zip" name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="sr-only" htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Patient Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Patient Email *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
          </div>
          <div className="bg-teal/5 border border-teal/10 rounded-lg p-4 mt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="hipaaConsent" checked={form.hipaaConsent} onChange={(e) => setForm({ ...form, hipaaConsent: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal" />
              <span className="text-xs text-gray-600 leading-relaxed">
                I have read and agree to the <Link href="/privacy" target="_blank" className="text-teal hover:text-teal-dark underline">Notice of Privacy Practices</Link>. I acknowledge that my health information will be used and disclosed as described in the HIPAA Privacy Policy. I understand I may request a copy of the full Notice at any time.
              </span>
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-serif text-lg text-dark mb-4">Insurance Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Subscriber (if different from patient)</p>
            <div className="mb-3">
              <label className="sr-only" htmlFor="subscriberName">Subscriber Name</label>
              <input id="subscriberName" name="subscriberName" value={form.subscriberName} onChange={handleChange} placeholder="Subscriber Name (if different)" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div className="mb-3">
              <label className="sr-only" htmlFor="subscriberDob">Subscriber DOB</label>
              <input id="subscriberDob" name="subscriberDob" type="date" value={form.subscriberDob} onChange={handleChange} placeholder="Subscriber DOB" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="subscriberAddress">Subscriber Address</label>
              <input id="subscriberAddress" name="subscriberAddress" value={form.subscriberAddress} onChange={handleChange} placeholder="Subscriber Address (if different)" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Primary Insurance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="sr-only" htmlFor="insuranceCarrier">Insurance Company</label>
                <input id="insuranceCarrier" name="insuranceCarrier" value={form.insuranceCarrier} onChange={handleChange} placeholder="Insurance Company" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
              </div>
              <div>
                <label className="sr-only" htmlFor="policyNumber">Policy Number</label>
                <input id="policyNumber" name="policyNumber" value={form.policyNumber} onChange={handleChange} placeholder="Policy Number" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Secondary Insurance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="sr-only" htmlFor="secondaryInsuranceCarrier">Secondary Insurance Company</label>
                <input id="secondaryInsuranceCarrier" name="secondaryInsuranceCarrier" value={form.secondaryInsuranceCarrier} onChange={handleChange} placeholder="Secondary Insurance Company" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
              </div>
              <div>
                <label className="sr-only" htmlFor="secondaryPolicyNumber">Secondary Policy Number</label>
                <input id="secondaryPolicyNumber" name="secondaryPolicyNumber" value={form.secondaryPolicyNumber} onChange={handleChange} placeholder="Secondary Policy Number" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-serif text-lg text-dark mb-4">Emergency Contact</h3>
          <div className="mb-3">
            <label className="sr-only" htmlFor="emergencyName">Emergency Contact Name</label>
            <input id="emergencyName" name="emergencyName" value={form.emergencyName} onChange={handleChange} required placeholder="Emergency Contact Name *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="sr-only" htmlFor="emergencyPhone">Emergency Phone</label>
              <input id="emergencyPhone" name="emergencyPhone" type="tel" value={form.emergencyPhone} onChange={handleChange} required placeholder="Emergency Phone *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
            <div>
              <label className="sr-only" htmlFor="emergencyRelationship">Relationship to Patient</label>
              <input id="emergencyRelationship" name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} required placeholder="Relationship to Patient *" className="w-full bg-white border border-[#ccdadb] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none font-sans" />
            </div>
          </div>
        </div>
      )}

      {step === 4 && status !== 'success' && (
        <div>
          <h3 className="font-serif text-lg text-dark mb-4">Pick a Date & Time</h3>

          {slots.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">
              <p>No available appointments right now.</p>
              <p className="mt-2">Please call (781) 742-0834 to schedule.</p>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => { if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11) } else { setCalMonth(calMonth - 1) } }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <span className="text-sm font-medium text-dark">{monthNames()[calMonth]} {calYear}</span>
                  <button onClick={() => { if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0) } else { setCalMonth(calMonth + 1) } }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center text-xs font-medium text-gray-400 mb-1">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => <div key={d} className="py-1.5">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
                  {Array.from({ length: firstDay(calYear, calMonth) }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth(calYear, calMonth) }).map((_, i) => {
                    const day = i + 1
                    const ds = fmtDate(calYear, calMonth, day)
                    const avail = isDateAvailable(day)
                    const past = isDateInPast(day)
                    const selectedDate = selectedSlot && selectedSlot.startsWith(ds)
                    return (
                      <button key={day} disabled={!avail || past}
                        onClick={() => setSelectedSlot(null)}
                        title={avail && !past ? 'Available' : ''}
                        className={`py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition ${
                          selectedDate ? 'bg-teal text-white' :
                          avail && !past ? 'bg-teal/10 text-teal-dark font-medium hover:bg-teal/20 cursor-pointer' :
                          'text-gray-300 cursor-default'
                        }`}>{day}</button>
                    )
                  })}
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1.5 border border-border rounded-lg p-2 sm:p-3">
                {availableDates.map((dateStr) => {
                  const daySlots = slotsForDate(dateStr)
                  if (daySlots.length === 0) return null
                  return (
                    <div key={dateStr}>
                      <div className="text-xs font-medium text-gray-400 mb-1.5 mt-2 first:mt-0">
                        {new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {daySlots.map((slot) => (
                          <button key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                              selectedSlot === slot.id
                                ? 'bg-teal text-white border-teal'
                                : 'bg-white text-gray-600 border-border hover:border-teal hover:text-teal-dark'
                            }`}>
                            {new Date(`2000-01-01T${slot.time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}

      {step === 4 && status === 'loading' && (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Booking your appointment...</p>
        </div>
      )}

      {step === 4 && status === 'error' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-dark mb-2">Something went wrong</h3>
          <p className="text-sm text-gray-500 mb-4">Please try again or call us at (781) 742-0834.</p>
          <button onClick={() => setStep(3)} className="text-sm text-teal hover:text-teal-dark underline mr-4">Go back</button>
          <button onClick={resetForm} className="text-sm text-gray-400 hover:text-gray-600 underline">Start over</button>
        </div>
      )}

      {step < 4 && (
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <div>{step > 1 ? <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-600 underline px-2 py-1">Back</button> : null}</div>
          <button onClick={nextStep} disabled={!canContinue()}
            className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-dark transition">
            Continue
          </button>
        </div>
      )}

      {step === 4 && status === 'idle' && (
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-600 underline px-2 py-1">Back</button>
          <button onClick={handleSubmit} disabled={!canContinue()}
            className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-dark transition">
            Book Appointment
          </button>
        </div>
      )}
    </div>
  )
}
