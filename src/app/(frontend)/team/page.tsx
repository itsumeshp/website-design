import { getTeam, getSiteSettings } from '@/lib/queries'
import PageBanner from '@/components/theme/PageBanner'
import TeamGrid from '@/components/theme/TeamGrid'
import ContactSection from '@/components/theme/ContactSection'

export const metadata = { title: 'Our Team' }

export default async function TeamPage() {
  const [team, settings] = await Promise.all([getTeam(), getSiteSettings()])

  return (
    <>
      <PageBanner title="Our Team" crumbs={[{ label: 'Our Team' }]} />
      <TeamGrid members={team} showTitle={false} />
      <ContactSection settings={settings} />
    </>
  )
}
