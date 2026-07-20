import Link from 'next/link'
import PageBanner from '@/components/theme/PageBanner'

export default function NotFound() {
  return (
    <>
      <PageBanner title="Error Page" crumbs={[{ label: '404' }]} />
      <section className="axis-error-sec pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="axis-content-box text-center">
                <div className="axis-image" data-aos="fade-up" data-aos-duration="800">
                  <img src="/assets/images/innerpage/404/404.png" alt="404 image" />
                </div>
                <h2 className="text-anm">Alas, that page is not accessible.</h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  It appears that nothing was found here. Try a search or one of the links below.
                </p>
                <div className="axis-button" data-aos="fade-up" data-aos-duration="1200">
                  <Link href="/" className="theme-btn style-one">
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
