import { useState, useEffect } from 'react'

const DASHBOARD_URL = 'https://retail-analytics-saas.vercel.app'

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight
      const winH = window.innerHeight
      const nearBottom = scrollY + winH > docH - 240
      setVisible(scrollY > 380 && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="mobile-cta-bar"
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 200,
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Glass surface */}
      <div style={{
        background: 'rgba(248,247,245,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.09)',
        padding: '12px 16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* Pulse dot + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
            background: '#1E362D',
            animation: 'pulseSoft 2.5s ease-in-out infinite',
          }} />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
              Retail Analytics Dashboard
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--muted)' }}>
              Live demo available
            </div>
          </div>
        </div>

        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--green)',
            color: '#fff',
            fontSize: '0.875rem', fontWeight: 700,
            padding: '12px 20px',
            borderRadius: '100px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(30,54,45,0.35)',
            flexShrink: 0,
          }}
        >
          Explore Dashboard
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
