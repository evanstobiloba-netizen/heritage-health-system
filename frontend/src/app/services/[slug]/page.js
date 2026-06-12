import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { servicesMap } from '../../../data/services'
import BookingForm from '../../../components/BookingForm'
import PageCTA from '../../../components/PageCTA'

export async function generateStaticParams() {
  return Object.keys(servicesMap).map((slug) => ({ slug }))
}

export default function ServicePage({ params }) {
  const service = servicesMap[params.slug]
  if (!service) notFound()

  return (
    <>
      <section className="relative bg-cream px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xs text-muted hover:text-teal transition mb-4 inline-block">&larr; Back to Home</Link>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="hhs-tag">Our Services</span>
              <h1 className="font-serif text-4xl md:text-5xl text-dark leading-[1.1] mb-4">{service.title}</h1>
              <p className="text-muted text-base leading-relaxed mb-6">{service.subtitle}</p>
              <Link href="/contact" className="bg-teal text-white text-sm px-7 py-3 rounded-button font-semibold hover:bg-teal-dark transition inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                Book Appointment <span>&rarr;</span>
              </Link>
            </div>
            <div className="flex-shrink-0 w-full md:w-72 h-48 md:h-56 rounded-2xl overflow-hidden relative">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {service.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif text-lg text-dark mb-3">{section.heading}</h2>
              <p className="text-sm text-muted leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="hhs-tag">Get Started</span>
          <h2 className="font-serif text-2xl md:text-4xl text-dark mb-3">Ready to Book an Appointment?</h2>
          <p className="text-muted text-sm">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-border shadow-lg">
            <BookingForm />
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  )
}
