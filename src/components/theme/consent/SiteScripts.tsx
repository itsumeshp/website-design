'use client'

import Script from 'next/script'
import { useConsent } from './useConsent'

// Public IDs (same as the existing infrion site). Overridable via env.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-7ZTMERMPB5'
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '6981e2d4e4ef801c3fc86744'
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || '1jghls3tu'

// Loads analytics + live chat only after the visitor accepts cookies.
export default function SiteScripts() {
  const { consent } = useConsent()
  if (consent !== 'accepted') return null

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {TAWK_PROPERTY_ID && TAWK_WIDGET_ID ? (
        <Script id="tawkto" strategy="afterInteractive">
          {`var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src="https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}";s1.charset="UTF-8";s1.setAttribute("crossorigin","*");s0.parentNode.insertBefore(s1,s0);})();`}
        </Script>
      ) : null}
    </>
  )
}
