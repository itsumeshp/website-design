import { getPayload } from 'payload'
import config from './payload.config'

/** Replaces team-members with the real team. Run: npm run seed:team */
const run = async () => {
  const payload = await getPayload({ config })
  await payload.delete({ collection: 'team-members', where: { id: { exists: true } } })

  const members = [
    {
      name: 'Umesh Prajapati',
      role: 'Founder',
      bio: 'I am a 20 year old student from India. I am a sophomore in college and I am currently learning about web development and I am a front end developer.',
      socials: [{ platform: 'linkedin' as const, url: 'https://www.linkedin.com/in/itsumeshp/' }],
    },
  ]

  let order = 0
  for (const m of members) {
    await payload.create({ collection: 'team-members', data: { ...m, order: order++ } })
  }
  payload.logger.info(`✅ Seeded ${members.length} team member(s).`)
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
