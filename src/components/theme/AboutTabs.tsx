'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  { id: 'tab1', label: 'Our Mission' },
  { id: 'tab2', label: 'Our Vision' },
  { id: 'tab3', label: 'Our History' },
]

const Panel = () => (
  <div className="content-box">
    <p>
      It is a long established fact that a reader will be distracted the readable content of a page
      when looking at layout the point of using lorem the is Ipsum less normal distribution of
      letters.
    </p>
    <div className="row">
      <div className="col-lg-5">
        <ul className="check-list style-two mb-35">
          <li>
            <i className="fas fa-check" />
            Technology Consultancy
          </li>
          <li>
            <i className="fas fa-check" />
            We Provide best services
          </li>
        </ul>
      </div>
      <div className="col-lg-5">
        <ul className="check-list style-two mb-35">
          <li>
            <i className="fas fa-check" />
            Maintenance And Support
          </li>
          <li>
            <i className="fas fa-check" />
            Requirements Gathering
          </li>
        </ul>
      </div>
    </div>
    <div className="axis-button-wrap">
      <div className="axis-button">
        <Link href="/about" className="theme-btn style-one">
          Discover More
          <i className="far fa-arrow-right" />
        </Link>
      </div>
      <div className="axis-support-box style-one">
        <div className="icon">
          <img src="/assets/images/home-one/icon/icon2.png" alt="phone" />
        </div>
        <div className="content">
          <span>Need Help?</span>
          <h6>
            <a href="tel:(+480)123678900">(+480) 123 678 900</a>
          </h6>
        </div>
      </div>
    </div>
  </div>
)

export default function AboutTabs() {
  const [active, setActive] = useState('tab1')
  return (
    <>
      <ul className="nav nav-tabs mb-35" data-aos="fade-up" data-aos-duration="1200">
        {tabs.map((t) => (
          <li key={t.id}>
            <button
              className={`nav-link${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`tab-pane fade${active === t.id ? ' show active' : ''}`}
            style={active === t.id ? undefined : { display: 'none' }}
          >
            <Panel />
          </div>
        ))}
      </div>
    </>
  )
}
