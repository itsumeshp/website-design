'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  {
    id: 'tab1',
    label: 'Our Mission',
    text: 'To build software that understands how your business actually works — AI agents, automation, and platforms shaped around your real workflows, not a generic template.',
  },
  {
    id: 'tab2',
    label: 'Our Approach',
    text: 'We map your logic first, design for today and tomorrow, build in iterative cycles with real feedback, and hand off systems your team can confidently own.',
  },
  {
    id: 'tab3',
    label: 'Our Promise',
    text: 'Engineering quality, production readiness, and secure defaults from day one — with documentation and monitoring so the system keeps running long after launch.',
  },
]

const Panel = ({ text }: { text: string }) => (
  <div className="content-box">
    <p>{text}</p>
    <div className="row">
      <div className="col-lg-5">
        <ul className="check-list style-two mb-35">
          <li>
            <i className="fas fa-check" />
            AI agents & automation
          </li>
          <li>
            <i className="fas fa-check" />
            Web & mobile platforms
          </li>
        </ul>
      </div>
      <div className="col-lg-5">
        <ul className="check-list style-two mb-35">
          <li>
            <i className="fas fa-check" />
            APIs & integrations
          </li>
          <li>
            <i className="fas fa-check" />
            Cloud architecture
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
            <a href="tel:+919328964742">+91 93289 64742</a>
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
            <Panel text={t.text} />
          </div>
        ))}
      </div>
    </>
  )
}
