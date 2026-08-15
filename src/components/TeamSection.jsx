const TEAM = [
  {
    name: 'Mohammad Nofal Zia',
    role: 'Frontend & Full-Stack Development',
    id: '01-134231-040',
    github: 'https://github.com/Nofalzia',
    linkedin: 'https://linkedin.com/in/nofal-zia',
    initials: 'NZ',
    color: '#1E362D',
  },
  {
    name: 'Azlan Shah',
    role: 'Backend & Database Development',
    id: '01-134231-017',
    github: null,
    linkedin: null,
    initials: 'AS',
    color: '#7C9473',
  },
]

export default function TeamSection() {
  return (
    <section id="about" className="section" style={{ background: 'var(--hero-surface)' }}>
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '1rem' }}>The Project</div>
          <h2 className="headline-section reveal reveal-delay-1" style={{ marginBottom: '1rem' }}>
            An academic project built<br/>around a real-world problem.
          </h2>
          <p className="reveal reveal-delay-2" style={{
            fontSize: '1.0625rem', color: 'var(--muted)', maxWidth: '540px',
            margin: '0 auto', lineHeight: 1.65,
          }}>
            This Retail Analytics Dashboard was developed as a Final Year Project at
            Bahria University Islamabad — addressing a genuine gap in affordable,
            accessible analytics tools for local retailers.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          maxWidth: '720px',
          margin: '0 auto 3rem',
        }} className="team-grid">
          {TEAM.map(member => (
            <div
              key={member.name}
              className="card reveal"
              style={{ padding: '2rem' }}
            >
              {/* Avatar */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: member.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
                  {member.initials}
                </span>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
                {member.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: '6px' }}>
                {member.role}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace', marginBottom: '1.25rem' }}>
                {member.id}
              </div>

              {/* Links */}
              {(member.github || member.linkedin) && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)',
                        textDecoration: 'none', padding: '5px 10px',
                        border: '1px solid var(--border)', borderRadius: '100px',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <GithubIcon size={13} /> GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)',
                        textDecoration: 'none', padding: '5px 10px',
                        border: '1px solid var(--border)', borderRadius: '100px',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <LinkedinIcon size={13} /> LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* University + supervisor card */}
        <div
          className="reveal"
          style={{
            maxWidth: '720px', margin: '0 auto',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* University crest placeholder */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '12px',
              background: 'rgba(30,54,45,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <UniversityIcon />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '3px' }}>
                Bahria University Islamabad
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                Department of Computer Sciences · Final Year Project 2026
              </div>
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }} className="supervisor-divider">
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Supervisor
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>Ms. Ameena Saaed</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .supervisor-divider { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--border); padding-top: 1.5rem; width: 100%; }
        }
      `}</style>
    </section>
  )
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function UniversityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3L3 9l11 6 11-6-11-6z" stroke="#1E362D" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M3 9v9M25 9v4" stroke="#1E362D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 11v7a7 7 0 0 0 14 0v-7" stroke="#1E362D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
