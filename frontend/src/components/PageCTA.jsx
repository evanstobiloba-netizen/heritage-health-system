import Link from 'next/link'

export default function PageCTA() {
  return (
    <div className="bg-dark hhs-section">
      <div className="max-w-5xl mx-auto text-center relative overflow-hidden rounded-3xl p-10 md:p-16 border border-white/10">
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80)',
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}
        ></div>
        <div className="relative z-10">
          <h3 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4">Ready to Take the Next Step?</h3>
          <p className="text-base md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Whether you&apos;re exploring SPRAVATO® for treatment-resistant depression or need personalized mental health care, Heritage Health System is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/spravato" className="bg-teal text-white text-base font-semibold px-10 py-4 rounded-button text-center w-full sm:w-auto hover:bg-teal-dark transition-colors">
              Learn About SPRAVATO®
            </Link>
            <Link href="/contact" className="bg-white text-dark text-base font-semibold px-10 py-4 rounded-button text-center w-full sm:w-auto hover:bg-gray-100 transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
