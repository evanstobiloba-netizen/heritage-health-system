import BookingForm from '../../components/BookingForm'
import PageCTA from '../../components/PageCTA'

export default function ContactPage() {
  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">Book an Appointment</h1>
        <p className="text-base md:text-lg text-gray-200">Insurance Verification & Scheduling</p>
      </div>

      <div className="hhs-section">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-dark mb-6">Book Your Appointment</h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-6">
              Select your preferred date and time, provide your insurance details, and we will verify your coverage before your visit.
            </p>
            <div className="bg-teal/5 border border-teal/10 rounded-xl p-5 mb-8 text-sm text-gray-600 space-y-1.5">
              <p><strong>How it works:</strong></p>
              <p>1. Enter your information and insurance details.</p>
              <p>2. Pick an available date and time.</p>
              <p>3. We verify your insurance &mdash; you are all set.</p>
            </div>
            <div className="space-y-5">
              {[
                { icon: 'phone', label: 'Phone', value: '(781) 742-0834', href: 'tel:0017817420834' },
                { icon: 'phone', label: 'Fax', value: '(781) 459-2666' },
                { icon: 'mail', label: 'Support', value: 'info@heritagehealthsystem.com', href: 'mailto:info@heritagehealthsystem.com' },
                { icon: 'map', label: 'Address', value: '21 Mayor Thomas J McGrath Hwy Unit 306, Quincy, MA' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'phone' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                      {item.icon === 'mail' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                      {item.icon === 'map' && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>}
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-teal hover:text-teal-dark">{item.value}</a>
                    ) : (
                      <span className="text-sm text-gray-500">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-border">
            <h3 className="text-sm font-medium text-dark mb-2">Complete Your Booking</h3>
            <p className="text-xs text-gray-400 mb-6">All fields marked with * are required.</p>
            <BookingForm />
          </div>
        </div>
      </div>

      <PageCTA />
    </>
  )
}
