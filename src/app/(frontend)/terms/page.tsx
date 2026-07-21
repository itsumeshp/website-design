import LegalPage, { LegalSection } from '@/components/theme/LegalPage'

export const metadata = { title: 'Terms of Use' }

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      description="These terms govern use of this website and our contact form. Project-specific terms are agreed separately in a contract or statement of work."
      lastUpdated="February 4, 2026"
    >
      <LegalSection heading="Website use">
        <ul>
          <li>You may browse the site and contact us for legitimate business inquiries.</li>
          <li>You agree not to misuse the site, attempt unauthorized access, or submit spam.</li>
          <li>You are responsible for ensuring that information you submit is accurate.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="No guarantees">
        <p>
          This site is provided for general informational purposes and may change over time. We do
          not guarantee uninterrupted availability or that content is error-free.
        </p>
      </LegalSection>

      <LegalSection heading="Contact submissions">
        <p>
          By submitting the form, you confirm you have the right to share the information provided.
          We may block submissions that appear abusive or automated.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All website content (text, branding, and design) is owned by Infrion Technolab or its
          licensors, unless stated otherwise. You may not copy or redistribute it without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the maximum extent permitted by law, we are not liable for indirect or consequential
          damages arising from use of this site.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
