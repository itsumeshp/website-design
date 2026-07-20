import { getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'Contact — Fexo' }

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return (
    <>
      <PageBanner title="Contact Us" crumbs={[{ label: 'Contact' }]} />
      <ContactSection settings={settings} />
    </>
  )
}
