const DASHBOARD_URL = 'https://retail-analytics-saas.vercel.app'
const TREND = [42,51,47,60,55,63,58,70,66,74,61,78,72,82,69,88,79,91,84,95,88,96]

function miniPath(data, w, h) {
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - 8 - ((v - min) / (max - min)) * (h - 16)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return { line: pts.join(' '), area: `0,${h} ${pts.join(' ')} ${w},${h}` }
}

/* ── 4 feature pills — SVG icon circles, no emojis ──────── */
const PILLS = [
  {
    text: 'CSV + Excel',
    icon: (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="0.5" width="6" height="9" rx="1" stroke="white" strokeWidth="1.1"/>
        <path d="M7 0.5v3h2.5" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    text: 'Interactive charts',
    icon: (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <polyline points="1,8 3,4.5 5,6 7,2 9,3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: 'Anomaly alerts',
    icon: (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 1L9.5 9H0.5L5 1z" stroke="white" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M5 4.5v2" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
        <circle cx="5" cy="7.5" r="0.5" fill="white"/>
      </svg>
    ),
  },
  {
    text: 'Role-based views',
    icon: (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="3.5" r="2" stroke="white" strokeWidth="1.1"/>
        <path d="M1 9c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
]

/* ── Desktop dashboard mockup ────────────────────────────── */
function DesktopMockup() {
  const { line, area } = miniPath(TREND, 240, 72)
  return (
    <div style={{
      background: 'var(--white)', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-float)',
      display: 'flex', width: '100%', maxWidth: '430px',
    }}>
      {/* Sidebar */}
      <div style={{ width: '42px', background: 'var(--green)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: '8px', flexShrink: 0 }}>
        <div style={{ width: '22px', height: '22px', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1 L6.2 4.8 L10 5 L6.2 5.2 L5 9 L3.8 5.2 L0 5 L3.8 4.8 Z" fill="#7C9473"/></svg>
        </div>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ width: '26px', height: '26px', borderRadius: '6px', background: i===1?'rgba(255,255,255,0.18)':'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '12px', height: '2px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '13px', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '11px' }}>
          <div>
            <div style={{ fontSize: '8px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Retail Analytics</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', fontFamily: "'Montserrat',sans-serif" }}>Overview</div>
          </div>
          <div style={{ fontSize: '8px', fontWeight: 600, background: 'var(--green-light)', color: 'var(--green)', padding: '3px 7px', borderRadius: '100px' }}>Business Owner</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '9px' }}>
          {[
            { label:'Revenue',    value:'Rs. 2.84M', change:'+12.4%', dark:false },
            { label:'Units Sold', value:'4,812',     change:'+8.2%',  dark:false },
            { label:'Anomalies',  value:'7',          change:'flagged',dark:true  },
          ].map(({ label, value, change, dark }) => (
            <div key={label} style={{ background: dark?'var(--green)':'var(--white)', borderRadius: '7px', padding: '7px', border: dark?'none':'1px solid var(--border)' }}>
              <div style={{ fontSize: '7px', color: dark?'rgba(255,255,255,0.6)':'var(--muted)', marginBottom: '3px' }}>{label}</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: dark?'#fff':'var(--text)', lineHeight: 1.2, marginBottom: '2px', fontFamily:"'Montserrat',sans-serif" }}>{value}</div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: dark?'rgba(255,255,255,0.5)':label==='Anomalies'?'var(--terra)':'#3f7b77' }}>{change}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--white)', borderRadius: '7px', border: '1px solid var(--border)', padding: '9px', marginBottom: '7px' }}>
          <div style={{ fontSize: '7px', color: 'var(--muted)', marginBottom: '5px', letterSpacing: '0.04em' }}>SALES TREND — LAST 30 DAYS</div>
          <svg width="100%" viewBox="0 0 240 72" preserveAspectRatio="none" style={{ display: 'block', height: '44px' }}>
            <defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C9473" stopOpacity="0.25"/><stop offset="100%" stopColor="#7C9473" stopOpacity="0"/></linearGradient></defs>
            <polygon points={area} fill="url(#dg)"/>
            <polyline points={line} fill="none" stroke="#7C9473" strokeWidth="2" strokeLinejoin="round" className="chart-line"/>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
            {['W1','W2','W3','W4'].map(w=><div key={w} style={{ fontSize: '6px', color: '#a1a1aa' }}>{w}</div>)}
          </div>
        </div>
        {[{name:'Basmati Rice',pct:72},{name:'Cooking Oil',pct:54},{name:'Detergent',pct:38}].map(({name,pct})=>(
          <div key={name} style={{ marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '7px', color: '#18181B' }}>{name}</span>
              <span style={{ fontSize: '7px', color: '#71717A' }}>{pct}%</span>
            </div>
            <div style={{ height: '2.5px', background: '#F3EDE4', borderRadius: '100px' }}>
              <div style={{ height: '2.5px', width: `${pct}%`, background: '#7C9473', borderRadius: '100px' }} />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(190,106,75,0.09)', borderRadius: '6px', padding: '6px 8px', border: '1px solid rgba(190,106,75,0.18)', marginTop: '7px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#BE6A4B', flexShrink: 0, animation: 'pulseSoft 2.5s ease-in-out infinite' }} />
          <div style={{ fontSize: '7px', color: '#BE6A4B', fontWeight: 700 }}>7 unusual patterns detected</div>
        </div>
        <div style={{ marginTop: '7px', textAlign: 'center' }}>
          <span style={{ fontSize: '6.5px', color: '#a1a1aa', letterSpacing: '0.04em' }}>DEMO DATA · retail-analytics-saas.vercel.app</span>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile stat cards ───────────────────────────────────── */
function MobileStats() {
  const { line, area } = miniPath(TREND, 320, 80)
  return (
    <div className="reveal reveal-delay-2" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '12px' }}>
        {[
          { label:'Revenue',    value:'Rs. 2.84M', change:'+12.4%', changeColor:'#16a34a', bg:'#fff' },
          { label:'Units Sold', value:'4,812',     change:'+8.2%',  changeColor:'#16a34a', bg:'#fff' },
          { label:'Anomalies',  value:'7',          change:'flagged',changeColor:'#BE6A4B', bg:'#1E362D' },
        ].map(({ label, value, change, changeColor, bg }) => (
          <div key={label} style={{ background:bg, borderRadius:'14px', padding:'14px 10px', border:bg==='#fff'?'1px solid rgba(0,0,0,0.08)':'none', textAlign:'center' }}>
            <div style={{ fontSize:'0.6875rem', color:bg==='#1E362D'?'rgba(255,255,255,0.55)':'var(--muted)', marginBottom:'6px' }}>{label}</div>
            <div style={{ fontSize:'clamp(0.95rem,4vw,1.2rem)', fontWeight:800, fontFamily:"'Montserrat',sans-serif", color:bg==='#1E362D'?'#fff':'var(--text)', lineHeight:1, marginBottom:'5px' }}>{value}</div>
            <div style={{ fontSize:'0.6875rem', fontWeight:700, color:changeColor }}>{change}</div>
          </div>
        ))}
      </div>
      <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid rgba(0,0,0,0.08)', padding:'14px', marginBottom:'10px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
          <span style={{ fontSize:'0.6875rem', fontWeight:700, fontFamily:"'Montserrat',sans-serif", color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>Sales Trend · 30 Days</span>
          <span style={{ fontSize:'0.75rem', fontWeight:700, color:'#16a34a' }}>↑ 12.4%</span>
        </div>
        <svg width="100%" viewBox="0 0 320 80" preserveAspectRatio="none" style={{ display:'block', height:'60px' }}>
          <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C9473" stopOpacity="0.25"/><stop offset="100%" stopColor="#7C9473" stopOpacity="0"/></linearGradient></defs>
          <polygon points={area} fill="url(#mg)"/>
          <polyline points={line} fill="none" stroke="#7C9473" strokeWidth="2.5" strokeLinejoin="round" className="chart-line"/>
        </svg>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
          {['W1','W2','W3','W4'].map(w=><span key={w} style={{ fontSize:'0.6875rem', color:'var(--muted)' }}>{w}</span>)}
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(190,106,75,0.09)', border:'1px solid rgba(190,106,75,0.22)', borderRadius:'14px', padding:'12px 14px' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#BE6A4B', flexShrink:0, animation:'pulseSoft 2.5s ease-in-out infinite' }} />
        <div>
          <div style={{ fontSize:'0.8125rem', fontWeight:700, color:'#BE6A4B' }}>7 unusual patterns detected</div>
          <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>Rule-based anomaly detection · Demo data</div>
        </div>
      </div>
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section aria-label="Hero" style={{ paddingTop: '80px', paddingBottom: '2.5rem', background: 'var(--bg)' }}>
      <div className="container">
        <div className="hero-shell reveal">
          <div className="hero-copy reveal reveal-delay-1">
            <div className="eyebrow">Retail Analytics</div>
            <h1 className="headline-hero reveal reveal-delay-2">
              See retail risks<br className="hero-br" />
              {' '}before it affects<br className="hero-br" />
              {' '}revenue.
            </h1>
            <p className="hero-subtitle reveal reveal-delay-3">
              Track your sales, stock, and performance without the friction of spreadsheets or guesswork.
            </p>

            <div className="hero-pills reveal reveal-delay-3">
              <div className="hero-pills-track">
                {[...PILLS, ...PILLS].map(({ text, icon }, index) => (
                  <span key={`${text}-${index}`} className="pill">
                    <span className="pill-icon">{icon}</span>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            <div className="cta-group reveal reveal-delay-4">
              <a href="https://retail-analytics-saas.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary">See the dashboard</a>
              <a href="#use-cases" className="btn-secondary">View use cases</a>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-2" aria-label="Retail analytics dashboard preview">
            <div className="stacked-cards">
              <div className="dashboard-card dashboard-card-back" />
              <div className="dashboard-card dashboard-card-mid" />
              <div className="dashboard-card dashboard-card-front">
                <div className="dashboard-topbar">
                  <span>Retail Analytics</span>
                  <span className="badge-soft">Owner View</span>
                </div>

                <div className="mini-stats">
                  <div className="mini-stat accent">
                    <small>Revenue</small>
                    <strong>Rs. 2.84M</strong>
                    <em>+12.4%</em>
                  </div>
                  <div className="mini-stat">
                    <small>Units</small>
                    <strong>4,812</strong>
                    <em>+8.2%</em>
                  </div>
                  <div className="mini-stat dark">
                    <small>Anomalies</small>
                    <strong>7</strong>
                    <em>flags</em>
                  </div>
                </div>

                <div className="chart-panel">
                  <label>Sales trend · last 30 days</label>
                  <svg viewBox="0 0 220 75" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 60 C 25 48, 45 42, 65 38 S 120 20, 150 28 S 195 16, 220 10 L220 75 L0 75 Z" fill="rgba(95,122,129,0.18)"/>
                    <path d="M0 60 C 25 48, 45 42, 65 38 S 120 20, 150 28 S 195 16, 220 10" fill="none" stroke="#5f7a81" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div className="product-list">
                  {[{name:'Basmati Rice',pct:72},{name:'Cooking Oil',pct:54},{name:'Detergent',pct:38}].map(({name,pct})=>(
                    <div key={name} className="product-row">
                      <div className="product-row-top"><span>{name}</span><b>{pct}%</b></div>
                      <div className="product-bar-track"><div className="product-bar-fill" style={{width:`${pct}%`}} /></div>
                    </div>
                  ))}
                </div>

                <div className="alert-row">
                  <span className="alert-dot" />
                  <small>7 unusual patterns detected</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-shell {
          background: var(--hero-surface);
          border-radius: 30px;
          padding: clamp(1.4rem, 3vw, 2.5rem);
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(280px, 500px);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
          min-height: 600px;
        }

        /* Explicit 3-line break: shown on desktop, hidden on mobile */
        .hero-br { display: none; }

        .hero-copy {
          max-width: 600px;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 520px;
          margin: 1.1rem 0 1.5rem;
        }

        .hero-pills {
          display: flex;
          align-items: center;
          width: 100%;
          overflow: hidden;
          margin-bottom: 1.5rem;
          position: relative;
          padding: 0.15rem 0;
          mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
        }

        .hero-pills-track {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: max-content;
          white-space: nowrap;
          animation: pill-marquee 18s linear infinite;
          will-change: transform;
        }

        .hero-pills:hover .hero-pills-track {
          animation-play-state: paused;
        }

        @keyframes pill-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.18);
          color: var(--text);
          font-size: 0.76rem;
          font-weight: 600;
          flex-shrink: 0;
          max-width: none;
        }

        .pill-icon {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pill-icon svg {
          width: 0.7rem;
          height: 0.7rem;
        }

        .cta-group {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stacked-cards {
          position: relative;
          width: min(100%, 420px);
          height: 420px;
        }

        .dashboard-card {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 82%;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(23,25,27,0.05);
          box-shadow: var(--shadow-card);
        }

        .dashboard-card-back {
          bottom: 24px;
          height: 250px;
          background: linear-gradient(135deg, #dfe3de 0%, #d4dbd7 100%);
          transform: translateX(-50%) rotate(-10deg);
        }

        .dashboard-card-mid {
          bottom: 12px;
          height: 255px;
          background: linear-gradient(135deg, #dfe0d7 0%, #cdd8d3 100%);
          transform: translateX(-50%) rotate(9deg);
        }

        .dashboard-card-front {
          bottom: 0;
          height: 290px;
          background: #f6f7f5;
          transform: translateX(-50%) rotate(0deg);
          padding: 0.9rem 0.9rem 0.8rem;
        }

        .dashboard-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 0.8rem;
        }

        .badge-soft {
          background: var(--green-light);
          color: var(--green);
          border-radius: 999px;
          padding: 0.25rem 0.5rem;
          letter-spacing: 0.02em;
          text-transform: none;
          font-weight: 700;
        }

        .mini-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.45rem;
          margin-bottom: 0.7rem;
        }

        .mini-stat {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.5rem 0.45rem;
        }

        .mini-stat.accent { background: rgba(95,122,129,0.08); }
        .mini-stat.dark { background: var(--green); color: white; }

        .mini-stat small {
          display: block;
          font-size: 0.56rem;
          opacity: 0.76;
          margin-bottom: 0.2rem;
        }

        .mini-stat strong {
          display: block;
          font-size: 0.82rem;
          line-height: 1.1;
          font-weight: 800;
        }

        .mini-stat em {
          display: block;
          margin-top: 0.2rem;
          font-size: 0.55rem;
          font-style: normal;
          opacity: 0.8;
        }

        .chart-panel {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.6rem 0.55rem 0.25rem;
          margin-bottom: 0.7rem;
        }

        .chart-panel label {
          display: block;
          font-size: 0.56rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 0.35rem;
        }

        .chart-panel svg {
          display: block;
          width: 100%;
          height: 72px;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .product-row { display: flex; flex-direction: column; gap: 0.15rem; }

        .product-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.68rem;
          color: var(--text);
        }

        .product-row-top b {
          font-size: 0.62rem;
          color: var(--muted);
          font-weight: 600;
        }

        .product-bar-track {
          height: 2.5px;
          background: rgba(23,25,27,0.08);
          border-radius: 100px;
          overflow: hidden;
        }

        .product-bar-fill {
          height: 100%;
          background: var(--green);
          border-radius: 100px;
          opacity: 0.55;
        }

        .alert-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.7rem;
          border-radius: 10px;
          background: rgba(95,122,129,0.06);
          border: 1px solid rgba(95,122,129,0.12);
          padding: 0.45rem 0.6rem;
        }

        .alert-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: var(--green);
          display: inline-block;
        }

        .alert-row small {
          color: var(--green);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── Desktop overrides (> 940px two-column layout) ── */
        @media (min-width: 941px) {
          .hero-br { display: block; }
          .headline-hero { max-width: none; }
          .hero-copy .eyebrow { margin-left: 0; text-align: left; }
        }

        @media (max-width: 940px) {
          .hero-shell {
            grid-template-columns: 1fr;
            min-height: 0;
          }

          .hero-copy {
            max-width: none;
            text-align: center;
          }

          .hero-subtitle,
          .hero-pills,
          .cta-group {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-subtitle {
            text-align: center;
          }

          .hero-pills {
            justify-content: center;
          }

          .cta-group {
            justify-content: center;
          }
        }

        @media (max-width: 720px) {
          .hero-shell {
            padding: 1rem 1rem 1.2rem;
          }

          .hero-copy {
            max-width: 100%;
          }

          .eyebrow {
            display: block;
            width: fit-content;
            margin: 0 auto 0.7rem;
          }

          .headline-hero {
            max-width: 16ch;
            margin: 1.5rem auto 0.75rem;
            font-size: clamp(2.5rem, 9vw, 3.1rem);
            line-height: 0.92;
            letter-spacing: -0.05em;
          }
        }

        @media (max-width: 640px) {
          .hero-shell {
            padding: 0.8rem 0.8rem 1rem;
            border-radius: 22px;
            min-height: 0;
            display: block;
            background: #e8e9e4;
            border: 1px solid rgba(23,25,27,0.08);
          }

          .hero-copy {
            text-align: center;
            max-width: 100%;
          }

          .hero-visual {
            display: flex;
            justify-content: center;
            margin-top: 0.6rem;
          }

          .eyebrow {
            display: none;
          }

          .headline-hero {
            display: block;
            text-align: center;
            max-width: 100%;
            width: 100%;
            margin: 1.25rem auto 0.6rem;
            font-size: clamp(2.6rem, 12vw, 3.7rem);
            line-height: 0.9;
            letter-spacing: -0.05em;
          }

          .hero-subtitle {
            font-size: 0.93rem;
            line-height: 1.5;
            max-width: none;
            width: 100%;
            margin: 1.15rem auto 0.9rem;
          }

          .hero-pills {
            display: none;
          }

          .hero-pills-track {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: max-content;
            white-space: nowrap;
            animation: pill-marquee 16s linear infinite;
          }

          .pill {
            padding: 0.5rem 0.8rem;
            font-size: 0.7rem;
            border-radius: 999px;
          }

          .pill-icon {
            width: 1.1rem;
            height: 1.1rem;
          }

          .cta-group {
            flex-direction: column;
            gap: 0.7rem;
            margin-top: 1rem;
          }

          .cta-group .btn-primary,
          .cta-group .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .stacked-cards {
            width: min(100%, 315px);
            height: 310px;
            margin-top: 0.15rem;
          }

          .dashboard-card-front {
            height: 260px;
            border-radius: 18px;
          }

          .dashboard-card-back {
            height: 220px;
            bottom: 18px;
          }

          .dashboard-card-mid {
            height: 228px;
            bottom: 8px;
          }
        }

        @media (max-width: 420px) {
          .headline-hero {
            font-size: clamp(2.1rem, 8.8vw, 2.7rem);
          }
        }
      `}</style>
    </section>
  )
}
