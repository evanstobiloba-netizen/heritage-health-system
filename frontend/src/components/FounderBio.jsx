'use client'

import Link from 'next/link'

export default function FounderBio() {
  return (
    <div className="bg-cream hhs-section relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'url(https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             filter: 'blur(4px)',
           }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-2">
            <div className="hhs-tag">Our Founder</div>
            <h2 className="hhs-h2 text-3xl md:text-4xl mb-6">Dr. Olubunmi Olawale, DNP, APRN, PMHNP-BC</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-5">
              Dr. Olubunmi Olawale is a board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC) and the founder of Heritage Health System. With over a decade of clinical experience, Dr. Olawale is dedicated to providing compassionate, evidence-based mental health care to adults facing a wide range of challenges.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-5">
              Specializing in treating anxiety, depression, ADHD, bipolar disorder, OCD, PTSD, and treatment-resistant depression (including SPRAVATO® therapy), Dr. Olawale takes a person-centered approach to create individualized treatment plans that promote long-term wellness, resilience, and recovery.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              Dr. Olawale is committed to making mental health care accessible, offering both in-person and telehealth services to meet patients where they are on their journey to healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="bg-teal text-white text-base font-semibold px-6 sm:px-10 py-4 rounded-button inline-flex items-center justify-center gap-2 hover:bg-teal-dark transition-colors w-full sm:w-auto whitespace-nowrap">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Learn More About Heritage
              </Link>
              <Link href="/contact" className="bg-dark text-white text-base font-semibold px-6 sm:px-10 py-4 rounded-button inline-flex items-center justify-center gap-2 hover:bg-dark-mid transition-colors w-full sm:w-auto whitespace-nowrap">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Book an Appointment
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white border border-border p-4">
              <img
                src="https://heritagehealthsystem.com/wp-content/uploads/2025/03/olubunmi-olawale.jpg"
                alt="Dr. Olubunmi Olawale, Founder of Heritage Health System"
                className="rounded-2xl w-full h-auto"
                loading="lazy"
              />
              <div className="pt-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-dark mb-2">Dr. Olubunmi Olawale</h3>
                <p className="text-teal font-medium mb-4">DNP, APRN, PMHNP-BC</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Anxiety', 'Depression', 'ADHD', 'Bipolar', 'OCD', 'PTSD', 'SPRAVATO®'].map((pill) => (
                    <span key={pill} className="text-xs bg-teal/10 text-teal-dark border border-teal/20 px-3 py-1.5 rounded-full">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
