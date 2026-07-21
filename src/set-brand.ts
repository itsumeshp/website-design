import { getPayload } from 'payload'
import config from './payload.config'

/**
 * One-off: set the brand to Infrion Technolab — uploads the light/dark logos +
 * favicon and updates Site Settings. Run with:  npm run set:brand
 * Idempotent: replaces prior brand logo media.
 */

const LOGOS = '/home/bytes-umesh/infrion/Assets/Logos'
const WHITE = `${LOGOS}/infrion-logo-white.png`
const DARK = `${LOGOS}/Without Backgrounds/Logo design/infrion-full-logo.png`
const ICON = `${LOGOS}/Without Backgrounds/Logo Icon.png`

const run = async () => {
  const payload = await getPayload({ config })

  await payload.delete({ collection: 'media', where: { alt: { like: 'Infrion Technolab logo' } } })

  const upload = async (filePath: string, alt: string) => {
    const m = await payload.create({ collection: 'media', data: { alt }, filePath })
    return m.id as number
  }

  const logo = await upload(WHITE, 'Infrion Technolab logo (light)')
  const logoDark = await upload(DARK, 'Infrion Technolab logo (dark)')
  const favicon = await upload(ICON, 'Infrion Technolab logo (icon)')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { siteName: 'Infrion Technolab', logo, logoDark, favicon },
  })

  payload.logger.info('✅ Brand set to Infrion Technolab (logos + name updated).')
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
