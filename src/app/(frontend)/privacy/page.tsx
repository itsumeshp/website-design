import LegalPage, { LegalSection } from '@/components/theme/LegalPage'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how we handle information submitted through our contact form."
      lastUpdated="February 9, 2026"
    >
      <LegalSection heading="What we collect">
        <p>
          When you submit the contact form, we collect the information you provide (such as name,
          email, subject, and message). We also collect limited technical metadata (such as your IP
          address) to help prevent abuse and protect the service.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <ul>
          <li>Respond to your inquiry and communicate with you</li>
          <li>Qualify and route requests internally</li>
          <li>Prevent spam and abuse</li>
          <li>Improve our lead handling process</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Service providers">
        <p>
          To operate this website we may use third-party services for hosting, email delivery, and
          analytics. Depending on configuration, these may process limited data such as IP address
          and interaction data.
        </p>
        <ul>
          <li>Email delivery for contact-form notifications</li>
          <li>Hosting and database infrastructure</li>
          <li>Site analytics (only if enabled)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Where it is stored / shared">
        <p>
          We store contact submissions in internal systems used for follow-up (such as our database
          and email tooling). We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="Retention">
        <p>
          We retain contact submissions for as long as needed to handle your request and for
          reasonable business recordkeeping, unless a longer retention period is required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can request access, correction, or deletion of your submission by contacting us. We may
          ask you to verify your identity before processing a request.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
