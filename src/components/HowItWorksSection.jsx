const STEPS = [
  { n:'01', title:'Upload',    body:'Bring in your existing sales and inventory exports. CSV and Excel files work straight away — no reformatting required.', icon:<UploadIcon/> },
  { n:'02', title:'Process',   body:'The system reads your file, structures the data, and stores it cleanly — ready for analysis.', icon:<ProcessIcon/> },
  { n:'03', title:'Analyze',   body:'Key metrics are calculated automatically: revenue totals, product rankings, trends, and statistical anomaly checks.', icon:<AnalyzeIcon/> },
  { n:'04', title:'Visualize', body:'Your data becomes interactive charts, KPI cards, and inventory tables you can explore and filter in real time.', icon:<VisualizeIcon/> },
  { n:'05', title:'Act',       body:'Walk into your week knowing what is performing, what needs attention, and what deserves a closer look.', icon:<ActIcon/> },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--hero-surface)' }}>
      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="hiw-grid">

          {/* Left */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: '1rem' }}>How It Works</div>
            <h2 className="headline-section reveal reveal-delay-1" style={{ marginBottom: '1.25rem' }}>
              From spreadsheet to action in five steps.
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '2rem' }}>
              Upload what you already use, turn it into a clear view of performance, and act before small issues become margin problems.
            </p>
            <div className="reveal reveal-delay-3">
              <a href="https://retail-analytics-saas.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View the dashboard →
              </a>
            </div>
          </div>

          {/* Right — steps */}
          <div>
            {STEPS.map((step, i) => (
              <div key={step.n} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  {/* Icon + connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: i === 0 ? 'var(--green)' : 'var(--white)',
                      border: `1.5px solid ${i === 0 ? 'var(--green)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: i === 0 ? '#fff' : 'var(--green)', flexShrink: 0,
                    }}>
                      {step.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: '1.5px', flex: 1, minHeight: '32px', background: 'var(--border)', margin: '6px 0' }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: i < STEPS.length - 1 ? '2rem' : 0, paddingTop: '10px' }}>
                    <span className="feat-num" style={{ display: 'block', marginBottom: '3px' }}>{step.n}</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>{step.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{step.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: horizontal swipeable step cards ──────── */}
        <div className="hiw-mobile" style={{ padding: '0 0.25rem' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '1rem', textAlign: 'center' }}>How It Works</div>
          <h2 className="headline-section reveal reveal-delay-1" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            From spreadsheet to action in five steps.
          </h2>
          <p className="reveal reveal-delay-2" style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.5rem', textAlign: 'center' }}>
            Upload what you already have and turn it into a clearer view of performance.
          </p>

          {/* Swipeable cards */}
          <div
            className="scroll-x reveal reveal-delay-2"
            style={{ display: 'flex', gap: '12px', paddingBottom: '8px', marginLeft: '-0.5rem', marginRight: '-0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="snap-start"
                style={{
                  flexShrink: 0,
                  width: '220px',
                  background: i === 0 ? 'var(--green)' : 'var(--white)',
                  borderRadius: '18px',
                  border: '1px solid var(--border)',
                  padding: '1.25rem',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', marginBottom: '14px',
                  background: i === 0 ? 'rgba(255,255,255,0.15)' : 'var(--green-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === 0 ? '#fff' : 'var(--green)',
                }}>
                  {step.icon}
                </div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', color: i === 0 ? 'rgba(255,255,255,0.78)' : 'rgba(23,25,27,0.65)', display: 'block', marginBottom: '4px' }}>{step.n}</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: i === 0 ? '#fff' : 'var(--text)', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '0.8125rem', color: i === 0 ? 'rgba(255,255,255,0.82)' : 'rgba(23,25,27,0.72)', lineHeight: 1.6 }}>{step.body}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '1rem' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: i === 0 ? '20px' : '6px', height: '6px', borderRadius: '100px', background: i === 0 ? 'var(--green)' : 'rgba(0,0,0,0.15)', transition: 'width 0.3s' }} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <a href="https://retail-analytics-saas.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center' }}>
              View the dashboard →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hiw-grid   { display: grid; }
        .hiw-mobile { display: none; }
        @media (max-width: 720px) {
          .hiw-grid   { display: none !important; }
          .hiw-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function UploadIcon()   { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 13V4M6 7l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg> }
function ProcessIcon()  { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/><rect x="11" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/><rect x="3" y="11" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/><rect x="11" y="11" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/></svg> }
function AnalyzeIcon()  { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polyline points="2,15 6,9 10,12 14,5 18,8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function VisualizeIcon(){ return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="8" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="4" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg> }
function ActIcon()      { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg> }
