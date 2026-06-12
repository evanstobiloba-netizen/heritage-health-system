import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-dark px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">Privacy Policy</h1>
        <p className="text-base md:text-lg text-teal-light">Last Updated: June 8, 2026</p>
      </div>

      <div className="hhs-section">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-border shadow-md">
            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">1. Introduction</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Heritage Health System (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting the privacy and security of your health information. This Privacy Policy describes how we collect, use, disclose, and safeguard your protected health information (PHI) in accordance with the Health Insurance Portability and Accountability Act of 1996 (HIPAA), the Texas Health and Safety Code, and other applicable federal and state laws.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                By using our services, you agree to the terms of this Privacy Policy. If you have any questions, please contact us at <a href="mailto:info@heritagehealthsystem.com" className="text-teal hover:text-teal-dark">info@heritagehealthsystem.com</a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">2. Information We Collect</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">We collect various types of information to provide you with quality mental health care:</p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li><strong>Protected Health Information (PHI):</strong> Medical history, mental health diagnoses, treatment plans, medications, and other health-related information you provide during your care.</li>
                <li><strong>Personal Information:</strong> Name, address, phone number, email address, date of birth, insurance information, and emergency contact details.</li>
                <li><strong>Payment Information:</strong> Credit/debit card details, insurance claims, and billing records.</li>
                <li><strong>Usage Information:</strong> Information about how you use our website, telehealth platform, and other digital services.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">3. How We Use Your Information</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li><strong>Treatment:</strong> To provide, coordinate, and manage your mental health care.</li>
                <li><strong>Payment:</strong> To bill your insurance, process payments, and collect outstanding balances.</li>
                <li><strong>Healthcare Operations:</strong> To improve our services, conduct quality assessments, train staff, and manage our practice.</li>
                <li><strong>Communication:</strong> To send appointment reminders, follow-up messages, and important health information.</li>
                <li><strong>Legal Compliance:</strong> To meet our legal and regulatory obligations.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">4. When We Disclose Your Information</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">We may disclose your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li><strong>As Required by Law:</strong> To comply with court orders, subpoenas, or government requests.</li>
                <li><strong>Public Health and Safety:</strong> To prevent or lessen a serious threat to health or safety.</li>
                <li><strong>Business Associates:</strong> With third parties who help us operate our practice (e.g., billing companies, telehealth providers) who are bound by HIPAA.</li>
                <li><strong>With Your Authorization:</strong> When you give us written permission to share your information.</li>
                <li><strong>For Treatment, Payment, or Healthcare Operations:</strong> As described in Section 3.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">5. Your Rights Under HIPAA and Texas Law</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li>Access and request copies of your health records.</li>
                <li>Request amendments to your health records.</li>
                <li>Request restrictions on how we use or disclose your information.</li>
                <li>Request confidential communications.</li>
                <li>Receive an accounting of disclosures of your health information.</li>
                <li>Request a paper copy of this Privacy Policy.</li>
                <li>File a complaint if you believe your privacy rights have been violated.</li>
              </ul>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-4">To exercise these rights, please contact our Privacy Officer at <a href="mailto:info@heritagehealthsystem.com" className="text-teal hover:text-teal-dark">info@heritagehealthsystem.com</a>.</p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">6. How We Protect Your Information</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                We implement appropriate administrative, physical, and technical safeguards to protect your health information from unauthorized access, use, disclosure, alteration, or destruction. These safeguards include:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li>Secure electronic storage of health records with encryption.</li>
                <li>Limited access to PHI on a need-to-know basis.</li>
                <li>Staff training on HIPAA and privacy policies.</li>
                <li>Secure telehealth platforms that comply with HIPAA requirements.</li>
                <li>Regular security assessments and updates.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">7. HIPAA Notice of Privacy Practices</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                <strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong>
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Heritage Health System is required by law to maintain the privacy of your protected health information (PHI) and to provide you with this Notice of our legal duties and privacy practices. We are required to abide by the terms of this Notice as currently in effect.
              </p>
              <h3 className="font-serif text-xl text-dark mb-3 mt-6">Uses and Disclosures of PHI</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">We may use and disclose your PHI for the following purposes without your written authorization:</p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                <li><strong>Treatment:</strong> We may use your PHI to provide, coordinate, or manage your health care and related services.</li>
                <li><strong>Payment:</strong> We may use and disclose your PHI to obtain payment for services we provide to you.</li>
                <li><strong>Healthcare Operations:</strong> We may use and disclose your PHI for health care operations such as quality improvement, staff training, and business management.</li>
                <li><strong>Appointment Reminders:</strong> We may use your PHI to contact you with appointment reminders or information about treatment alternatives.</li>
              </ul>
              <h3 className="font-serif text-xl text-dark mb-3 mt-6">Uses and Disclosures Requiring Authorization</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Other uses and disclosures of your PHI will be made only with your written authorization, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                <li>Most uses and disclosures of psychotherapy notes</li>
                <li>Uses and disclosures of PHI for marketing purposes</li>
                <li>Disclosures that constitute a sale of PHI</li>
                <li>Other uses and disclosures not described in this Notice</li>
              </ul>
              <h3 className="font-serif text-xl text-dark mb-3 mt-6">Your HIPAA Rights</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">You have the following rights regarding your PHI:</p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-gray-600 leading-relaxed">
                <li><strong>Right to Access:</strong> You may inspect and obtain copies of your health records.</li>
                <li><strong>Right to Amend:</strong> You may request corrections to your health records.</li>
                <li><strong>Right to an Accounting:</strong> You may request a list of disclosures we have made of your PHI.</li>
                <li><strong>Right to Request Restrictions:</strong> You may request restrictions on how we use or disclose your PHI.</li>
                <li><strong>Right to Confidential Communications:</strong> You may request that we communicate with you in a certain way.</li>
                <li><strong>Right to Request a Paper Copy:</strong> You may request a paper copy of this Notice at any time.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">8. Data Privacy & Security</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                We take the security of your personal and health information seriously. Heritage Health System implements comprehensive technical, administrative, and physical safeguards to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS/SSL protocols. Stored health records are encrypted at rest.</li>
                <li><strong>Access Controls:</strong> Access to PHI is restricted to authorized personnel on a need-to-know basis. Multi-factor authentication is required for all system access.</li>
                <li><strong>Audit Logs:</strong> All access to patient records is logged and regularly audited for unauthorized activity.</li>
                <li><strong>Secure Telehealth:</strong> Our telehealth platform uses HIPAA-compliant, end-to-end encrypted video conferencing.</li>
                <li><strong>Data Minimization:</strong> We collect only the information necessary to provide you with quality care.</li>
                <li><strong>Breach Notification:</strong> In the event of a data breach affecting your PHI, we will notify you as required by HIPAA and applicable state law.</li>
                <li><strong>Third-Party Vendors:</strong> All business associates who handle your PHI are contractually bound to comply with HIPAA security and privacy requirements.</li>
              </ul>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We conduct regular security risk assessments, staff training, and policy reviews to ensure ongoing compliance with evolving privacy and security standards.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Our services are not intended for individuals under the age of 18 without parental or guardian consent. We do not knowingly collect personal information from children under 13 without verifiable parental consent in accordance with the Children&apos;s Online Privacy Protection Act (COPPA).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We reserve the right to update this Privacy Policy at any time. We will notify you of material changes by posting the updated policy on our website or sending you a direct communication. Your continued use of our services after such changes constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">11. Contact Us</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact:
              </p>
              <div className="bg-teal/5 rounded-xl p-6 border border-teal/20">
                <p className="text-base md:text-lg text-gray-700 mb-2"><strong>Heritage Health System</strong></p>
                <p className="text-base md:text-lg text-gray-600 mb-2">21 Mayor Thomas J McGrath Hwy Unit 306, Quincy, MA</p>
                <p className="text-base md:text-lg text-gray-600 mb-2">Phone: <a href="tel:0017817420834" className="text-teal hover:text-teal-dark">(781) 742-0834</a></p>
                <p className="text-base md:text-lg text-gray-600">Email: <a href="mailto:info@heritagehealthsystem.com" className="text-teal hover:text-teal-dark">info@heritagehealthsystem.com</a></p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4">10. Filing a Complaint</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                If you believe your privacy rights have been violated, you may file a complaint with:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-600 leading-relaxed">
                <li>Heritage Health System at the contact information above.</li>
                <li>The U.S. Department of Health and Human Services Office for Civil Rights (OCR): <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/index.html" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-dark">www.hhs.gov/ocr/privacy/hipaa/complaints/index.html</a>.</li>
                <li>The Texas Health and Human Services Commission (HHSC): <a href="https://www.hhsc.texas.gov" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-dark">www.hhsc.texas.gov</a>.</li>
              </ul>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-4">We will not retaliate against you for filing a complaint.</p>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-dark px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-teal text-white text-base font-semibold px-8 py-3 rounded-button text-center w-full sm:w-auto hover:bg-teal-dark transition-colors">
              Back to Home
            </Link>
            <Link href="/contact" className="bg-white text-dark text-base font-semibold px-8 py-3 rounded-button text-center w-full sm:w-auto hover:bg-gray-100 transition-colors">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
