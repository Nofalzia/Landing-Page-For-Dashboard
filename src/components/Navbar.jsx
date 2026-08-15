import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Use Cases',    href: '#use-cases' },
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about' },
]

const DASHBOARD_URL = 'https://retail-analytics-saas.vercel.app'

function StarLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1E362D"/>
      <path d="M16 5 L17.6 13.4 L26 16 L17.6 18.6 L16 27 L14.4 18.6 L6 16 L14.4 13.4 Z" fill="#7C9473"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.3s, border-color 0.3s',
          background: scrolled ? 'rgba(248,247,245,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'space-between' }}
        >

          {/* Logo */}
          <a
            href="/"
            aria-label="Retail Analytics — Home"
            style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', flexShrink: 0 }}
          >
            <StarLogo />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.9375rem', fontWeight: 700,
              color: 'var(--text)', letterSpacing: '-0.01em',
            }}>
              Retail Analytics
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="nav-links-desktop">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'color 0.2s', letterSpacing: '0.01em',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop" style={{ alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://github.com/Nofalzia/Retail_Analytics_Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              style={{ color: 'var(--muted)', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <GithubIcon />
            </a>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.8125rem', padding: '0.55rem 1.125rem', minHeight: '38px' }}
            >
              Explore Dashboard
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Mobile: hamburger only */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', color: 'var(--text)', display: 'none',
              alignItems: 'center', justifyContent: 'center',
              borderRadius: '8px', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ─────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
      >
        {/* Menu header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '2.5rem',
          paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)',
        }}>
          <a href="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <StarLogo />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
              Retail Analytics
            </span>
          </a>
          <button
            aria-label="Close menu"
            onClick={close}
            style={{
              background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer',
              padding: '8px', borderRadius: '8px', color: 'var(--text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <XIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation links" style={{ flex: 1 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={close}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: "'Roboto Slab', serif",
                fontSize: '1.625rem', fontWeight: 600,
                color: 'var(--text)', textDecoration: 'none',
                padding: '0.875rem 0',
                borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={close}
            style={{ justifyContent: 'center', fontSize: '0.9375rem', padding: '0.875rem' }}
          >
            Explore Dashboard <ArrowRight size={15} />
          </a>
          <a
            href="https://github.com/Nofalzia/Retail_Analytics_Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            onClick={close}
            style={{ justifyContent: 'center', fontSize: '0.9375rem', padding: '0.875rem' }}
          >
            <GithubIcon /> View on GitHub
          </a>
        </div>
      </div>

      {/* Responsive rules */}
      <style>{`
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-cta-desktop {
          display: flex;
        }
        .nav-hamburger {
          display: none !important;
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </>
  )
}

/* ── Icons ───────────────────────────────────────────────── */
function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}
