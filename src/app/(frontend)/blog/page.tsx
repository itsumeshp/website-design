import Link from 'next/link'
import { getPosts } from '@/lib/queries'
import { Container, Section } from '@/components/ui'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

export const metadata = { title: 'Blog — Fexo' }

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <PageHeader title="Blog" />
      <Section>
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-body-text">No posts yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.05}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-muted bg-white transition hover:shadow-lg">
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 font-heading text-2xl font-bold text-heading/30">
                      {post.title.charAt(0)}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {typeof post.category === 'object' && post.category ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-primary">
                          {post.category.name}
                        </span>
                      ) : null}
                      <h2 className="mt-2 font-heading text-lg font-semibold text-heading group-hover:text-primary">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 flex-1 text-sm text-body-text">{post.excerpt}</p>
                      ) : null}
                      {post.publishedAt ? (
                        <time className="mt-4 text-xs text-body-text">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
