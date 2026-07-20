'use client'

import { useState } from 'react'

export type ServiceTab = {
  id: string
  title: string
  heading: string
  desc: string
  image: string
  href: string
}

export default function ServiceTabs({ services }: { services: ServiceTab[] }) {
  const [active, setActive] = useState(services[0]?.id ?? '')
  if (services.length === 0) return null

  return (
    <div className="service-wrapper" data-aos="fade-up" data-aos-duration="1200">
      <div className="shape">
        <img src="/assets/images/home-one/service/shape.png" alt="shape" />
      </div>
      <div className="service-nav">
        <ul className="nav nav-tabs">
          {services.map((s) => (
            <li key={s.id}>
              <a
                className={`nav-link${active === s.id ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActive(s.id)
                }}
                href={s.href}
              >
                {s.title}
                <span>
                  <i className="far fa-arrow-right" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        {services.map((s) => (
          <div
            key={s.id}
            className={`tab-pane fade${active === s.id ? ' show active' : ''}`}
            style={active === s.id ? undefined : { display: 'none' }}
          >
            <div className="service-content-wrap">
              <div className="content-box">
                <h5>{s.heading}</h5>
                <p>{s.desc}</p>
                <ul className="check-list style-two">
                  <li>
                    <i className="fas fa-check" />
                    Technology Consultancy
                  </li>
                  <li>
                    <i className="fas fa-check" />
                    We Provide best services
                  </li>
                  <li>
                    <i className="fas fa-check" />
                    Requirements Gathering
                  </li>
                </ul>
              </div>
              <div className="axis-image">
                <img src={s.image} alt="service image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
