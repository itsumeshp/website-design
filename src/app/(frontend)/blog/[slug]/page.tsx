import { notFound } from 'next/navigation'
import { getPost } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import RichText from '@/components/RichText'

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const category = typeof post.category === 'object' ? post.category : null
  const author = typeof post.author === 'object' ? post.author : null

  return (
    <>
      <PageHeader title={post.title} crumb={{ label: 'Blog', href: '/blog' }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body-text">
            {category ? <span className="text-primary">{category.name}</span> : null}
            {author ? <span>By {author.name}</span> : null}
            {post.publishedAt ? (
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            ) : null}
          </div>
          <RichText
            data={post.content}
            className="prose max-w-none text-body-text [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_h1]:text-heading [&_h2]:text-heading [&_h3]:text-heading"
          />
        </Container>
      </Section>
    </>
  )
}
