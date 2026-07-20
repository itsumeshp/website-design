import { notFound } from 'next/navigation'
import { getPost } from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import PageBanner from '@/components/theme/PageBanner'
import RichText from '@/components/RichText'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return buildMetadata({
    seo: post.seo,
    fallbackTitle: post.title,
    fallbackDescription: post.excerpt ?? undefined,
  })
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const cat = typeof post.category === 'object' ? post.category : null
  const author = typeof post.author === 'object' ? post.author : null
  const thumb = mediaUrl(post.coverImage)?.url ?? '/assets/images/innerpage/blog/blog-single1.jpg'

  return (
    <>
      <PageBanner title={post.title} crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

      <section className="axis-blog-details-sec pt-120 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="blog-details-wrapper">
                <div className="blog-post-main mb-70" data-aos="fade-up" data-aos-duration="1000">
                  <div className="blog-post-item">
                    <div className="post-thumbnail">
                      <img src={thumb} alt="Post Thumbnail" />
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        {author ? (
                          <span>
                            <i className="far fa-user" /> By <a href="#">{author.name}</a>
                          </span>
                        ) : null}
                        {cat ? (
                          <span>
                            <i className="far fa-tags" />
                            <a href="#">{cat.name}</a>
                          </span>
                        ) : null}
                        {post.publishedAt ? (
                          <span>
                            <i className="far fa-calendar-alt" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        ) : null}
                      </div>
                      <h4 className="title">{post.title}</h4>
                      {post.excerpt ? <p>{post.excerpt}</p> : null}
                      <RichText data={post.content} />
                    </div>
                  </div>
                  {post.tags && post.tags.length > 0 ? (
                    <div className="entry-footer mt-30">
                      <div className="tag-links">
                        <span>Tag:</span>
                        {post.tags.map((t) => (
                          <a href="#" key={t.id ?? t.tag}>
                            {t.tag}
                          </a>
                        ))}
                      </div>
                      <div className="social-share">
                        <span>Share:</span>
                        <a href="#"><i className="fab fa-facebook-f" /></a>
                        <a href="#"><i className="fab fa-linkedin-in" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
