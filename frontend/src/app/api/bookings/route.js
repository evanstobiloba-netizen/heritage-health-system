import { readJSON, writeJSON } from '../_lib/db'

export async function POST(req) {
  const body = await req.json()
  const {
    firstName, lastName, email, phone, dob,
    address, city, state, zip,
    subscriberName, subscriberDob, subscriberAddress,
    insuranceCarrier, policyNumber,
    secondaryInsuranceCarrier, secondaryPolicyNumber,
    emergencyName, emergencyPhone, emergencyRelationship,
    slotId,
  } = body

  if (!firstName || !lastName || !email || !phone || !dob || !slotId) {
    return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }

  let slots = readJSON('slots.json')
  const slot = slots.find((s) => s.id === slotId)
  if (!slot) return Response.json({ error: 'This time slot is no longer available.' }, { status: 404 })
  if (slot.booked) return Response.json({ error: 'This time slot has just been booked.' }, { status: 409 })

  slot.booked = true
  writeJSON('slots.json', slots)

  const booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    firstName, lastName, email, phone, dob,
    address: address || '', city: city || '', state: state || '', zip: zip || '',
    subscriberName: subscriberName || '',
    subscriberDob: subscriberDob || '',
    subscriberAddress: subscriberAddress || '',
    insuranceCarrier: insuranceCarrier || '',
    policyNumber: policyNumber || '',
    secondaryInsuranceCarrier: secondaryInsuranceCarrier || '',
    secondaryPolicyNumber: secondaryPolicyNumber || '',
    emergencyName: emergencyName || '',
    emergencyPhone: emergencyPhone || '',
    emergencyRelationship: emergencyRelationship || '',
    slotId,
    appointmentDate: slot.date,
    appointmentTime: slot.time,
    status: 'pending',
    providerName: '',
    providerNetworkStatus: '',
    effectiveDate: '',
    authorizationNumber: '',
    numberOfVisits: '',
    copay: '',
    telehealth: false,
    refNumber: '',
    ineligible: false,
    internalNotes: '',
    createdAt: new Date().toISOString(),
  }

  const bookings = readJSON('bookings.json')
  bookings.push(booking)
  writeJSON('bookings.json', bookings)

  return Response.json({ success: true, message: 'Your appointment has been booked! Insurance verification is in progress.', booking }, { status: 201 })
}
