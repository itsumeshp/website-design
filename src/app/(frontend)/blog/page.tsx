import Link from 'next/link'
import { getPosts } from '@/lib/queries'
import { mediaUrl } from '@/lib/media'
import PageBanner from '@/components/theme/PageBanner'

export const metadata = { title: 'Blog — Fexo' }

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <PageBanner title="Our Blog" crumbs={[{ label: 'Blog' }]} />

      <section className="axis-blog-sec pt-120 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            {posts.map((post, i) => {
              const cat = typeof post.category === 'object' ? post.category : null
              return (
                <div className="col-xl-4 col-md-6 col-sm-6" key={post.id}>
                  <div className="axis-blog-post-item style-one mb-40" data-aos="fade-up" data-aos-duration={1000 + (i % 3) * 200}>
                    <div className="post-thumbnail">
                      <img
                        src={mediaUrl(post.coverImage)?.url ?? `/assets/images/home-one/blog/blog-img${(i % 3) + 1}.jpg`}
                        alt="blog image"
                      />
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        {cat ? (
                          <span>
                            <i className="far fa-tags" />
                            {cat.name}
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
                      <h4 className="title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <div className="post-bottom">
                        <Link href={`/blog/${post.slug}`} className="read-more style-one">
                          Read Details
                          <i className="far fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
