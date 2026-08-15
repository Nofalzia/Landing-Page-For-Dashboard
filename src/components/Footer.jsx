const DASHBOARD_URL = 'https://retail-analytics-saas.vercel.app'

const NAV = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Architecture', href: '#architecture' },
  ],
  Project: [
    { label: 'Explore Dashboard', href: DASHBOARD_URL, external: true },
    { label: 'GitHub Repository', href: 'https://github.com/Nofalzia/Retail_Analytics_Dashboard', external: true },
    { label: 'About the Team', href: '#about' },
  ],
  University: [
    { label: 'Bahria University Islamabad', href: 'https://www.bahria.edu.pk', external: true },
    { label: 'Department of CS', href: 'https://www.bahria.edu.pk', external: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--text)', color: 'rgba(255,255,255,0.55)' }} aria-label="Site footer">
      <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(3, 1fr)',
          gap: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '2rem',
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <RALogo />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                Retail Analytics
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '260px', marginBottom: '1.5rem' }}>
              A web-based retail analytics dashboard that turns CSV and Excel data
              into actionable visual insights.
            </p>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.8125rem', fontWeight: 600,
                color: '#7C9473', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a0b89a'}
              onMouseLeave={e => e.currentTarget.style.color = '#7C9473'}
            >
              retail-analytics-saas.vercel.app →
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([section, links]) => (
            <div key={section}>
              <div style={{
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                marginBottom: '1rem',
              }}>
                {section}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '1rem',
        }}>
          <div style={{ fontSize: '0.8125rem' }}>
            © {year} Retail Analytics Dashboard. Final Year Project — Bahria University Islamabad.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8125rem' }}>
              Built with React · Node.js · Chart.js · SQL
            </span>
            <a
              href="https://github.com/Nofalzia/Retail_Analytics_Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}

function RALogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1E362D"/>
      <path d="M8 22V10h6a4 4 0 0 1 0 8h-2l4 4H13l-3.5-4H10v4H8z" fill="#fff"/>
      <rect x="10" y="12" width="4" height="4" rx="1" fill="#7C9473"/>
      <path d="M18 10h2l4 12h-2l-1-3h-4l-1 3h-2l4-12zm1 3-1.5 4h3L19 13z" fill="#fff"/>
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
