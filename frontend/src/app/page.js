import Link from 'next/link'
import BookingForm from '../components/BookingForm'
import FounderBio from '../components/FounderBio'
import PageCTA from '../components/PageCTA'

const services = [
  {
    title: 'Psychiatric Evaluation',
    desc: 'Comprehensive assessment of your emotional and psychological health to determine the best care path.',
    path: '/services/comprehensive-psychiatric-evaluation',
  },
  {
    title: 'Medication Management',
    desc: 'Ongoing monitoring and adjustments to your psychiatric medications for optimal results.',
    path: '/services/medication-management',
  },
  {
    title: 'Counseling Services',
    desc: 'Individual, group, and family therapy options tailored to meet your specific needs.',
    path: '/services/counseling-services',
  },
  {
    title: 'Diagnostic Evaluation',
    desc: 'Detailed assessments to identify underlying causes of your mental health concerns.',
    path: '/services/diagnostic-evaluation',
  },
  {
    title: 'Telehealth Services',
    desc: 'Secure video consultations bringing expert mental health care directly to you.',
    path: '/services/telehealth-services',
  },
  {
    title: 'Person-Centered Care',
    desc: 'Compassionate, individualized care addressing anxiety, depression, trauma, and more.',
    path: '/services/person-centered-behavioral-healthcare',
  },
]

const conditions = [
  { label: 'ADHD' },
  { label: 'Anxiety' },
  { label: 'Depression' },
  { label: 'Bipolar' },
  { label: 'OCD' },
  { label: 'PTSD' },
  { label: 'Sleep Disorder' },
  { label: 'Schizophrenia' },
]

const faqs = [
  { q: 'How do I schedule an appointment?', a: 'Fill out our insurance verification form, and our team will contact you within 1\u20132 business days. You can typically be seen within 1\u20132 weeks. You can also call or text (781) 742-0834.' },
  { q: 'Do you offer in-person and telehealth visits?', a: 'Yes \u2014 both options are available on weekdays and weekends. Telehealth sessions are fully secure.' },
  { q: 'What insurance do you accept?', a: 'We accept UHC, Optum, Cigna, Blue Cross, Aetna, Medicare, and Oscar. Submit our insurance verification form and we will confirm your coverage within 1\u20132 business days.' },
]

export default function HomePage() {
  return (
    <>
      <div className="grid md:grid-cols-[1.1fr_0.9fr] min-h-[520px]">
        <div className="bg-dark px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-teal/15 text-teal-light text-xs px-4 py-2 rounded-full border border-teal/25 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-teal inline-block" />
            Now Accepting New Patients
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Your Partner in<br />
            <em className="text-green not-italic">Mental Wellness</em>
          </h1>
          <p className="text-base md:text-lg text-[#8AACAC] leading-relaxed mb-10 max-w-lg">
            Compassionate, evidence-based mental health care in Quincy, MA. Evaluations, therapy, medication management, and telehealth \u2014 all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-teal text-white text-sm font-medium px-8 py-4 rounded-button text-center w-full sm:w-auto">
              Schedule Evaluation
            </Link>
            <Link href="/about" className="border border-white/25 text-white text-sm px-8 py-4 rounded-button text-center w-full sm:w-auto">
              Learn More
            </Link>
          </div>
        </div>
        <div className="bg-dark-mid flex flex-col items-center justify-end p-10 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{
                 backgroundImage: 'url(https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}
          />
          <div className="flex items-center gap-1.5 mb-3.5 relative z-[1] self-start">
            <div className="w-2 h-2 rounded-full bg-green" />
            <span className="text-sm text-[#8AACAC]">Availability: <strong className="text-white font-medium">Weekdays & Weekends · In-Person & Virtual</strong></span>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-xl p-5 w-full relative z-[1]">
            <div className="font-serif text-xl text-white mb-1">Dr. Olubunmi Olawale</div>
            <div className="text-sm text-teal mb-3">DNP, APRN, PMHNP-BC · Psychiatric Mental Health NP</div>
            <div className="flex flex-wrap gap-1.5">
              {['Anxiety', 'Depression', 'ADHD', 'Bipolar', 'OCD', 'PTSD'].map((pill) => (
                <span key={pill} className="text-sm bg-teal/15 text-teal-light border border-teal/20 px-2.5 py-1 rounded-full">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FounderBio />

      <div className="hhs-section">
        <div className="hhs-tag">Our Services</div>
        <h2 className="hhs-h2">Expert Care for Your Well-being</h2>
        <p className="hhs-sub">A full spectrum of mental health services tailored to your individual needs, available both in-person and via telehealth.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Link key={svc.path} href={svc.path} className="bg-white rounded-xl p-8 border border-border hover:shadow-md transition group">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-teal/20 transition">
                <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="font-medium text-lg text-dark mb-2">{svc.title}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{svc.desc}</div>
              <span className="text-sm text-teal mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hhs-section">
        <div className="hhs-tag">Meet the Provider</div>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
          <div className="rounded-2xl h-[300px] md:h-[360px] overflow-hidden relative">
            <img
              src="https://heritagehealthsystem.com/wp-content/uploads/2025/03/olubunmi-olawale.jpg"
              alt="Dr. Olubunmi Olawale, PMHNP-BC"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-green text-white text-xs px-3 py-1.5 rounded-full font-medium">PMHNP-BC</div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <div className="font-serif text-lg text-white">Dr. Olubunmi Olawale</div>
              <div className="text-xs text-teal mt-1">DNP, APRN · UMass Dartmouth & Northeastern</div>
            </div>
          </div>
          <div>
            <h2 className="hhs-h2 mb-2">Dr. Olubunmi Olawale</h2>
            <div className="text-sm text-teal-dark font-medium mb-5">DNP, APRN, PMHNP-BC · 5+ Years Experience</div>
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              With over 5 years of specialized experience, Dr. Olawale provides comprehensive psychiatric evaluations, diagnosis, and medication management for a wide range of conditions including anxiety, depression, bipolar disorder, ADHD, OCD, and psychotic disorders.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              A graduate of UMass Dartmouth and Northeastern University, she combines deep clinical expertise with compassionate, patient-centered care. Currently accepting new patients on weekdays and weekends \u2014 both virtually and in-person.
            </p>
            <Link href="/contact" className="bg-teal text-white text-sm px-6 py-3 rounded-button inline-block text-center w-full sm:w-auto">
              Book with Dr. Olawale &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="hhs-section">
        <div className="bg-dark rounded-2xl p-8 md:p-12">
          <div className="hhs-tag" style={{color: '#1AACB8'}}>Conditions We Treat</div>
          <h2 className="hhs-h2 text-white mb-2">Tailored Care for a Wide Range of Conditions</h2>
          <p className="text-base text-[#5a8a8e] leading-relaxed mb-8">Custom assessments and individualized treatment strategies to restore control over your well-being.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {conditions.map((c) => (
              <div key={c.label} className="bg-white/10 border border-white/15 rounded-lg p-6 text-sm text-[#c8e0dd]">
                <div className="text-teal text-xl mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                {c.label}
              </div>
            ))}
          </div>
          <Link href="/contact" className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-button inline-block text-center w-full sm:w-auto">
            Make an Appointment &rarr;
          </Link>
        </div>
      </div>

      <div className="w-full bg-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
             style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80)'
             }}
        ></div>
        <div className="hhs-section relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-white">Now Offering Spravato Treatment</h3>
              <p className="text-lg text-white/85 mt-3 max-w-xl">FDA-approved nasal spray for treatment-resistant depression. Available in-clinic.</p>
            </div>
            <Link href="/spravato" className="bg-white text-green-dark text-base font-semibold px-8 py-4 rounded-button whitespace-nowrap hover:scale-105 transition-transform">
              Learn About Spravato &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="hhs-section">
        <div className="hhs-tag">Resources</div>
        <h2 className="hhs-h2">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            { title: 'Understanding the Signs of Anxiety in Everyday Life', tag: 'Anxiety', tagColor: 'bg-teal', date: 'May 2026' },
            { title: 'ADHD in Adults: Symptoms You Might Be Missing', tag: 'ADHD', tagColor: 'bg-green-dark', date: 'April 2026' },
            { title: 'How Telehealth is Changing Mental Health Access', tag: 'Telehealth', tagColor: 'bg-teal', date: 'March 2026' },
          ].map((post) => (
            <div key={post.title} className="bg-white rounded-xl overflow-hidden border border-border">
              <div className="h-[110px] bg-teal/10 relative">
                <span className={`absolute top-3 left-3 text-sm px-3 py-1 rounded-full font-medium text-white ${post.tagColor}`}>
                  {post.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="font-medium text-lg text-dark leading-relaxed mb-2">{post.title}</div>
                <div className="text-sm text-gray-300">{post.date} · 4 min read</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hhs-section">
        <div className="hhs-tag">FAQ</div>
        <h2 className="hhs-h2 mb-6">Common Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-white rounded-xl px-6 py-5 border border-border group">
              <summary className="font-medium text-base text-dark flex items-center justify-between cursor-pointer">
                {faq.q}
                <svg className="w-5 h-5 text-teal flex-shrink-0 group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="text-base text-gray-500 leading-relaxed mt-3">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      <div className="hhs-section">
        <div className="bg-[#EAF3F4] rounded-2xl p-6 md:p-12 grid md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <div className="hhs-tag" style={{color: '#0E8A94'}}>Get in Touch</div>
            <h2 className="hhs-h2">Take the First Step</h2>
            <p className="text-sm text-[#4a6e72] leading-relaxed mt-3 mb-6">Choose your preferred date and time, submit your insurance details, and we will take care of the rest.</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start sm:items-center gap-3 text-sm text-[#3a5a5e]">
                <svg className="w-5 h-5 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (781) 742-0834
              </div>
              <div className="flex items-start sm:items-center gap-3 text-sm text-[#3a5a5e]">
                <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@heritagehealthsystem.com</span>
              </div>
              <div className="flex items-start sm:items-center gap-3 text-sm text-[#3a5a5e]">
                <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>21 Mayor Thomas J McGrath Hwy, Unit 306, Quincy, MA</span>
              </div>
            </div>
          </div>
          <div>
            <BookingForm />
          </div>
        </div>
      </div>

      <PageCTA />
    </>
  )
}
