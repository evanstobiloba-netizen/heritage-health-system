import Link from 'next/link'
import BookingForm from '../../components/BookingForm'
import PageCTA from '../../components/PageCTA'

const values = [
  { icon: 'compassion', title: 'Compassion', desc: 'We approach every patient with empathy, dignity, and respect.' },
  { icon: 'evidence', title: 'Evidence-Based', desc: 'We use the latest research and proven practices in our care.' },
  { icon: 'centered', title: 'Person-Centered', desc: 'Your unique needs guide every treatment plan we create.' },
  { icon: 'accessible', title: 'Accessible', desc: 'In-person and telehealth services to meet you where you are.' },
]

const stats = [
  { number: '12+', label: 'Years of Clinical Experience' },
  { number: '500+', label: 'Patients Supported' },
  { number: '10+', label: 'Specialized Services' },
  { number: '4.8', label: 'Patient Satisfaction' },
]

function ValueIcon({ icon }) {
  if (icon === 'compassion') return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  if (icon === 'evidence') return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  if (icon === 'centered') return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  if (icon === 'accessible') return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  return null
}

export default function AboutPage() {
  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80)',
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}
        ></div>
        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-4">About Us</h1>
          <h2 className="font-serif text-xl md:text-3xl text-teal-light">Your Partner in Mental Wellness</h2>
        </div>
      </div>

      <div className="hhs-section">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="hhs-tag">Our Story</div>
            <h2 className="hhs-h2 text-3xl md:text-4xl mb-6">A Legacy of Mental Wellness</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Mental wellness is our heritage from inception, and it should be lifelong. At Heritage Health System, we provide assistance in claiming and maintaining your mental wellness using evidence-based practices to support and promote your lifelong daily function.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              As a trusted provider of mental health care, we offer a wide range of services designed to address emotional, psychological, and behavioral challenges. Our team consists of experienced psychiatrists, licensed therapists, and mental health professionals who are committed to delivering personalized care.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              With a patient-centered approach, we create individualized treatment plans that promote long-term wellness, resilience, and recovery.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="Heritage Health System"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hhs-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="hhs-tag">Our Impact</div>
            <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">Making a Difference</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-2xl p-8 shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="font-serif text-4xl md:text-5xl font-bold text-teal mb-2">{stat.number}</div>
                <div className="text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-cream hhs-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="hhs-tag">Our Values</div>
            <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">What Guides Us</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape every interaction and treatment decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-md border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-teal mb-6">
                  <ValueIcon icon={value.icon} />
                </div>
                <h3 className="font-serif text-xl font-bold text-dark mb-3">{value.title}</h3>
                <p className="text-base text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hhs-section px-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-dark rounded-3xl p-10 md:p-16 text-white text-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-5"
                 style={{
                   backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}
            ></div>
            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-4xl font-bold mb-5">Ready to Begin Your Journey?</h3>
              <p className="text-base md:text-xl text-[#8AACAC] mb-10 max-w-2xl mx-auto">
                Your mental health matters, and we are here to support you. Whether you need a psychiatric evaluation, counseling, or telehealth services, Heritage Health System is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-teal text-white text-base font-semibold px-10 py-4 rounded-button text-center w-full sm:w-auto hover:bg-teal-dark transition-colors">
                  Contact Us Today
                </Link>
                <Link href="/contact" className="bg-white text-dark text-base font-semibold px-10 py-4 rounded-button text-center w-full sm:w-auto hover:bg-gray-100 transition-colors">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cream hhs-section px-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="hhs-tag">Get in Touch</div>
            <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">We&apos;d Love to Hear From You</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-border shadow-lg">
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Complete the form below to verify your insurance. Our team will contact you within 1&ndash;2 business days to schedule your appointment.</p>
            <BookingForm />
          </div>
        </div>
      </div>

      <PageCTA />
    </>
  )
}
