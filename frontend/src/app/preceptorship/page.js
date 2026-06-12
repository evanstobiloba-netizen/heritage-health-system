import Link from 'next/link'
import PageCTA from '../../components/PageCTA'

export default function PreceptorshipPage() {
  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">Preceptorship</h1>
        <p className="text-base md:text-lg text-teal-light">Guided Clinical Learning With Expert Mentorship</p>
      </div>

      <div className="hhs-section">
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-6">
            Our Preceptorship Program provides hands-on, real-world clinical training for Nurse Practitioners. Under the guidance of experienced providers, participants gain direct exposure to patient care, clinical decision-making, documentation standards, and practice management.
          </p>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-12">
            Whether you are a new graduate preparing for independent practice or a clinician looking to enhance specific skills, our structured preceptorship ensures you learn with confidence and competence.
          </p>

          <div className="bg-teal/5 rounded-2xl p-6 md:p-14 mb-12">
            <h2 className="font-serif text-xl md:text-2xl text-dark mb-6">What You Will Learn</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Comprehensive patient assessment', 'Diagnosis & treatment planning',
                'Medication management', 'EMR documentation and clinical note writing',
                'Evidence-based care guidelines', 'Behavioral health screening & management',
                'Practice workflow and patient communication', 'Professional ethics and HIPAA compliance',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-base md:text-lg text-gray-600">
                  <svg className="w-5 h-5 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl text-dark mb-4">Who Can Enroll?</h2>
            <p className="text-base md:text-lg text-gray-500">Our preceptorship program is ideal for Nurse Practitioners (PMHNP).</p>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl text-dark mb-6">Program Structure</h2>
            <div className="space-y-4">
              {[
                { n: '1', title: 'One-on-One Supervision', desc: 'Shadow experienced providers in a real clinical setting and participate in guided patient encounters.' },
                { n: '2', title: 'Structured Clinical Hours', desc: 'Complete required hours for certification, job readiness, or board requirements.' },
                { n: '3', title: 'Real Patient Experience', desc: 'Observe and participate in initial evaluations, follow-up visits, medication reviews, diagnostic assessments, and treatment planning.' },
                { n: '4', title: 'Documentation Training', desc: 'Learn SOAP notes, HPI documentation, medication management notes, and EMR best practices.' },
              ].map((item) => (
                <div key={item.n} className="bg-white rounded-xl p-6 border border-border">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-teal-dark font-bold text-lg">{item.n}</span>
                  </div>
                  <h3 className="font-medium text-lg text-dark mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal text-white rounded-2xl p-6 md:p-14 mb-12">
            <h2 className="font-serif text-xl md:text-2xl mb-6">Benefits of Our Preceptorship Program</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Gain real-time clinical experience', 'Boost clinical confidence',
                'Strengthen diagnostic and therapeutic skills', 'Learn directly from licensed providers',
                'Improve EMR proficiency', 'Become job-ready with practical exposure',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-base md:text-lg">
                  <span className="text-teal-light text-lg">&#9733;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl text-dark mb-4">Duration & Scheduling</h2>
            <p className="text-base md:text-lg text-gray-500">We offer flexible scheduling:</p>
            <ul className="list-disc list-inside text-base md:text-lg text-gray-500 mt-3 space-y-2">
              <li>Weekly or monthly programs</li>
              <li>Full-time or part-time clinical hours</li>
              <li>Remote + onsite hybrid options (based on provider availability)</li>
            </ul>
          </div>

          <div className="text-center bg-cream rounded-2xl p-6 md:p-14">
            <h2 className="font-serif text-xl md:text-2xl text-dark mb-4">Enroll Today</h2>
            <p className="text-base md:text-lg text-gray-500 mb-6">If you&apos;re looking for structured, hands-on clinical experience to start or advance your healthcare career, our Preceptorship Program is designed for you.</p>
            <Link href="/contact" className="bg-teal text-white text-sm font-medium px-8 py-4 rounded-button inline-block text-center w-full sm:w-auto">
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>

      <PageCTA />
    </>
  )
}
