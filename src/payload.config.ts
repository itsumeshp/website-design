import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { gcsStorage } from '@payloadcms/storage-gcs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { TeamMembers } from './collections/TeamMembers'
import { Services } from './collections/Services'
import { PricingTiers } from './collections/PricingTiers'
import { Faqs } from './collections/Faqs'
import { Testimonials } from './collections/Testimonials'
import { Clients } from './collections/Clients'
import { Leads } from './collections/Leads'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Absolute base URL — required so the admin builds correct links behind a
  // proxy (Cloud Run). Uses a NON-public var so it's read at runtime (a
  // NEXT_PUBLIC_* var would be inlined at build as localhost).
  serverURL: process.env.PAYLOAD_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Content
    Posts,
    Categories,
    Authors,
    Projects,
    Services,
    PricingTiers,
    Faqs,
    Testimonials,
    Clients,
    TeamMembers,
    // Inbox
    Leads,
    // Admin
    Media,
    Users,
  ],
  globals: [SiteSettings, Header, Footer, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Dev: auto-push schema for fast iteration. Prod: apply committed migrations.
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    // Store media in Google Cloud Storage when a bucket is configured
    // (required on Cloud Run — its disk is ephemeral). Falls back to local
    // disk in dev when GCS_BUCKET is unset.
    ...(process.env.GCS_BUCKET
      ? [
          gcsStorage({
            collections: { media: true },
            bucket: process.env.GCS_BUCKET,
            options: {
              projectId: process.env.GCP_PROJECT_ID,
              // On Cloud Run the runtime service account is used automatically;
              // locally, point GOOGLE_APPLICATION_CREDENTIALS at a key file.
            },
          }),
        ]
      : []),
  ],
})
