import Link from 'next/link'
import BookingForm from '../../components/BookingForm'
import PageCTA from '../../components/PageCTA'

export default function SpravatoPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-4">SPRAVATO® Treatment</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-teal-light max-w-3xl mx-auto">Innovative Therapy for Treatment-Resistant Depression</p>
        </div>
      </div>

      <div className="hhs-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="hhs-tag">Advanced Treatment</div>
              <h2 className="hhs-h2 text-3xl md:text-4xl mb-6">Hope is Here</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                At Heritage Health System, we are committed to providing advanced treatment options for individuals struggling with severe depression. One of the innovative therapies we offer is <strong>SPRAVATO® (esketamine) nasal spray</strong>, an FDA-approved medication designed to help patients who have not responded adequately to traditional antidepressant medications.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                SPRAVATO® is unique because it is believed to work differently than traditional antidepressants by targeting glutamate, the most abundant excitatory neurotransmitter in the brain.
              </p>
              <Link href="/contact" className="bg-teal text-white text-base font-semibold px-10 py-4 rounded-button inline-block text-center w-full sm:w-auto hover:bg-teal-dark transition-colors">
                Contact Us to Learn More
              </Link>
            </div>
            <div className="bg-teal/5 rounded-3xl p-4 md:p-12">
              <img
                src="https://images.unsplash.com/photo-1584362917165-52627c12a0f2?w=800&q=80"
                alt="SPRAVATO Treatment at Heritage Health System"
                className="rounded-2xl shadow-xl w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="hhs-tag">What is SPRAVATO®?</div>
              <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">FDA-Approved Innovation</h2>
            </div>
            <div className="bg-cream rounded-3xl p-6 md:p-12">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                <strong>SPRAVATO® (esketamine) CIII nasal spray</strong> is a prescription medicine approved by the <strong>U.S. Food and Drug Administration (FDA)</strong> for adults with:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
                  <div className="text-teal mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-dark mb-3">Treatment-Resistant Depression (TRD)</h3>
                  <p className="text-base text-gray-600">Used with or without an antidepressant taken by mouth</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
                  <div className="text-teal mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-dark mb-3">MDD with Suicidal Thoughts</h3>
                  <p className="text-base text-gray-600">Used with an antidepressant taken by mouth for depressive symptoms</p>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                SPRAVATO® is administered as a nasal spray and must be given in a <strong>certified medical facility under professional supervision</strong>. It is only available through a restricted program called the <strong>SPRAVATO® Risk Evaluation and Mitigation Strategy (REMS) Program</strong>.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 bg-dark/5 rounded-3xl p-4 md:p-12">
              <img
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
                alt="How SPRAVATO works in the brain"
                className="rounded-2xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="hhs-tag">How It Works</div>
              <h2 className="hhs-h2 text-3xl md:text-4xl mb-6">A Different Approach</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                Unlike many traditional antidepressants that affect serotonin or norepinephrine, SPRAVATO® is an <strong>NMDA receptor antagonist</strong> that acts on glutamate in the brain.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                The exact way SPRAVATO® works is unknown, but it is believed to help:
              </p>
              <div className="space-y-4">
                {[
                  'Restore neural connections in the brain',
                  'Improve communication between brain cells',
                  'Provide faster relief of depressive symptoms for some patients (as early as 24 hours)'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border">
                    <svg className="w-6 h-6 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base md:text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="hhs-tag">Who Benefits?</div>
              <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">Is SPRAVATO® Right for You?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Tried Multiple Antidepressants', desc: 'Have not responded to two or more antidepressant medications' },
                { title: 'Severe or Persistent Depression', desc: 'Experience symptoms that impact daily life and well-being' },
                { title: 'Seeking New Options', desc: 'Want an alternative or additional treatment approach for depression' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 shadow-md border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                  <h3 className="font-serif text-xl font-bold text-dark mb-4">{item.title}</h3>
                  <p className="text-base text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="hhs-tag">Your Journey</div>
              <h2 className="hhs-h2 text-3xl md:text-4xl mb-4">What to Expect During Treatment</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Arrive & Check In', text: 'Patient arrives at our clinic for the scheduled treatment session' },
                { step: '02', title: 'Administration', text: 'The medication is administered under medical supervision' },
                { step: '03', title: 'Monitoring', text: 'Remain in our clinic for approximately two hours of observation' },
                { step: '04', title: 'Return Home', text: 'Patients must arrange for transportation after the session' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-8 shadow-md border border-border">
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center font-serif text-3xl font-bold text-teal-dark mb-6">{item.step}</div>
                  <h3 className="font-serif text-xl font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-base text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark rounded-3xl p-10 md:p-16 text-white text-center overflow-hidden relative mb-20">
            <div className="absolute inset-0 opacity-5"
                 style={{
                   backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}
            ></div>
            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-4xl font-bold mb-5">Ready to Learn More?</h3>
              <p className="text-base md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Heritage Health System is dedicated to offering superior treatment options in support of your mental health journey. Our team is here to answer your questions about SPRAVATO® treatment.
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

          <div className="bg-cream rounded-3xl p-6 md:p-16 mb-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-block bg-red-50 text-red-700 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Important Safety Information
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-border">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-dark mb-6">What You Need to Know</h3>
              <div className="space-y-4 text-base md:text-lg text-gray-700">
                <p><strong>SPRAVATO® can cause serious side effects including:</strong> Sedation, dissociation, respiratory depression, and risks of abuse and misuse.</p>
                <p>You will be monitored for at least 2 hours after each dose by your healthcare provider.</p>
                <p>SPRAVATO® is only available through the SPRAVATO® REMS Program.</p>
                <p>Please see full Prescribing Information and Medication Guide for SPRAVATO® and discuss any questions with your healthcare provider.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-border shadow-xl">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-2">Get Started with SPRAVATO®</h3>
              <p className="text-base md:text-lg text-gray-600">Submit your information below and we will contact you to discuss SPRAVATO® treatment options.</p>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>

      <PageCTA />
    </>
  )
}
