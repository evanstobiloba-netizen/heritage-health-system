import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

export const metadata = {
  title: 'Heritage Health System | Psychiatric Mental Health Care Quincy MA',
  description: 'Compassionate, evidence-based mental health care in Quincy, MA. Psychiatric evaluations, medication management, counseling, and telehealth.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
