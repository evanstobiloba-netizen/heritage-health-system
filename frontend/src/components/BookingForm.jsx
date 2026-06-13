'use client'

import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['Patient Info', 'Insurance', 'Emergency Contact']

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
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function isValidPolicy(val) {
    return !val || (val.length >= 3 && /[a-zA-Z]/.test(val) && /[0-9]/.test(val))
  }

  function canContinue() {
    if (step === 1) return form.firstName && form.lastName && form.email && form.phone && form.dob && form.hipaaConsent
    if (step === 2) {
      if (form.insuranceCarrier && !isValidPolicy(form.policyNumber)) return false
      if (form.secondaryInsuranceCarrier && !isValidPolicy(form.secondaryPolicyNumber)) return false
      return true
    }
    if (step === 3) return form.emergencyName && form.emergencyPhone && form.emergencyRelationship
    return true
  }

  function nextStep() { if (canContinue()) setStep((s) => Math.min(s + 1, 3)) }
  function prevStep() { setStep((s) => Math.max(s - 1, 1)) }

  async function handleSubmit() {
    if (!canContinue()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Something went wrong.') }
      const result = await res.json()
      setStatus('success')
    } catch { setStatus('error') }
  }

  function resetForm() {
    setForm(INITIAL_FORM)
    setStatus('idle')
    setStep(1)
  }

  if (status === 'success') {
    return (
      <div className="bg-green/5 border border-green/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-dark mb-1">Inquiry Submitted!</h3>
        <p className="text-sm text-gray-500 mb-5">Your information has been received. We will verify your insurance and contact you to schedule an appointment.</p>
        <div className="bg-teal/5 border border-teal/10 rounded-lg p-4 text-left text-sm text-gray-600 space-y-2 mb-5">
          <p><strong>What happens next?</strong></p>
          <p>&bull; Our team will review your insurance information.</p>
          <p>&bull; We will contact you within 1-2 business days to schedule your appointment.</p>
          <p>&bull; Need immediate assistance? Call us at (781) 742-0834.</p>
        </div>
        <button onClick={resetForm} className="text-sm text-teal hover:text-teal-dark underline">Submit another inquiry</button>
      </div>
    )
  }

  return (
    <div>
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
                {form.insuranceCarrier && form.policyNumber && !isValidPolicy(form.policyNumber) && (
                  <p className="text-xs text-red-500 mt-1">Must contain letters &amp; numbers (min 3 chars)</p>
                )}
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
                {form.secondaryInsuranceCarrier && form.secondaryPolicyNumber && !isValidPolicy(form.secondaryPolicyNumber) && (
                  <p className="text-xs text-red-500 mt-1">Must contain letters &amp; numbers (min 3 chars)</p>
                )}
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

      {status === 'loading' && (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Submitting your information...</p>
        </div>
      )}

      {step < 3 && (
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <div>{step > 1 ? <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-600 underline px-2 py-1">Back</button> : <div />}</div>
          <button onClick={nextStep} disabled={!canContinue()}
            className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-dark transition">
            Continue
          </button>
        </div>
      )}

      {step === 3 && status !== 'loading' && (
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-600 underline px-2 py-1">Back</button>
          <button onClick={handleSubmit} disabled={!canContinue()}
            className="bg-teal text-white text-sm px-6 py-2.5 rounded-button font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-dark transition">
            Submit for Review
          </button>
        </div>
      )}
    </div>
  )
}
