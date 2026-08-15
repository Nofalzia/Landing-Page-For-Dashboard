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
      background: '#FAF7F1', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
      display: 'flex', width: '100%', maxWidth: '430px',
    }}>
      {/* Sidebar */}
      <div style={{ width: '42px', background: '#1E362D', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: '8px', flexShrink: 0 }}>
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
            <div style={{ fontSize: '8px', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Retail Analytics</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#18181B', fontFamily: "'Montserrat',sans-serif" }}>Overview</div>
          </div>
          <div style={{ fontSize: '8px', fontWeight: 600, background: 'rgba(30,54,45,0.1)', color: '#1E362D', padding: '3px 7px', borderRadius: '100px' }}>Business Owner</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '9px' }}>
          {[
            { label:'Revenue',    value:'Rs. 2.84M', change:'+12.4%', dark:false },
            { label:'Units Sold', value:'4,812',     change:'+8.2%',  dark:false },
            { label:'Anomalies',  value:'7',          change:'flagged',dark:true  },
          ].map(({ label, value, change, dark }) => (
            <div key={label} style={{ background: dark?'#1E362D':'#fff', borderRadius: '7px', padding: '7px', border: dark?'none':'1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '7px', color: dark?'rgba(255,255,255,0.6)':'#71717A', marginBottom: '3px' }}>{label}</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: dark?'#fff':'#18181B', lineHeight: 1.2, marginBottom: '2px', fontFamily:"'Montserrat',sans-serif" }}>{value}</div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: dark?'rgba(255,255,255,0.5)':label==='Anomalies'?'#BE6A4B':'#16a34a' }}>{change}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: '7px', border: '1px solid rgba(0,0,0,0.07)', padding: '9px', marginBottom: '7px' }}>
          <div style={{ fontSize: '7px', color: '#71717A', marginBottom: '5px', letterSpacing: '0.04em' }}>SALES TREND — LAST 30 DAYS</div>
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
    <section aria-label="Hero" style={{ paddingTop: '80px', paddingBottom: '3rem', background: 'var(--bg)' }}>
      <div className="container">
        <div style={{
          background: 'var(--hero-surface)',
          borderRadius: '24px',
          padding: 'clamp(1.75rem,5vw,4rem)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative rings */}
          {[320, 200].map(size => (
            <div key={size} aria-hidden="true" style={{ position:'absolute', right:'-60px', top:'-60px', width:`${size}px`, height:`${size}px`, borderRadius:'50%', border:'1px solid rgba(30,54,45,0.07)', pointerEvents:'none' }} />
          ))}

          {/* ── DESKTOP ─────────────────────────────────── */}
          <div className="hero-desktop-grid">
            <div style={{ maxWidth: '520px' }}>
              <div className="eyebrow reveal" style={{ marginBottom: '1.25rem' }}>Retail Intelligence</div>

              {/* Clean headline — no inline icon */}
              <h1 className="headline-hero reveal reveal-delay-1" style={{ marginBottom: '1.25rem' }}>
                See what your retail data is telling you.
              </h1>

              <p className="reveal reveal-delay-2" style={{ fontSize:'1rem', color:'var(--muted)', lineHeight:1.65, marginBottom:'1.75rem', maxWidth:'420px' }}>
                Bring your CSV and Excel data together. Visualize sales and inventory.
                Automatically flag unusual patterns — no technical setup needed.
              </p>

              {/* Pills — SVG icon circles, no emojis */}
              <div className="reveal reveal-delay-2" style={{ display:'flex', flexWrap:'wrap', gap:'7px', marginBottom:'2rem' }}>
                {PILLS.map(({ text, icon }) => (
                  <span key={text} style={{
                    display:'inline-flex', alignItems:'center', gap:'7px',
                    background:'rgba(255,255,255,0.75)', border:'1px solid var(--border)',
                    padding:'6px 13px', borderRadius:'100px',
                    fontSize:'0.8125rem', color:'var(--text)', fontWeight:600,
                    fontFamily:"'Montserrat',sans-serif",
                  }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', justifyContent:'center',
                      width:'18px', height:'18px', borderRadius:'50%',
                      background:'var(--green)', flexShrink:0,
                    }}>
                      {icon}
                    </span>
                    {text}
                  </span>
                ))}
              </div>

              <div className="reveal reveal-delay-3 cta-group" style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Explore Dashboard
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#how-it-works" className="btn-secondary">See how it works</a>
              </div>
            </div>

            <div className="reveal reveal-delay-2" aria-hidden="true" style={{ flexShrink:0, alignSelf:'center' }}>
              <DesktopMockup />
            </div>
          </div>

          {/* ── MOBILE ──────────────────────────────────── */}
          <div className="hero-mobile-only">
            <div className="eyebrow reveal" style={{ marginBottom:'1rem', textAlign:'center' }}>Retail Intelligence</div>
            <h1 className="headline-hero reveal reveal-delay-1" style={{ textAlign:'center', marginBottom:'1rem' }}>
              See what your retail data is telling you.
            </h1>
            <p className="reveal reveal-delay-2" style={{ fontSize:'0.9375rem', color:'var(--muted)', lineHeight:1.65, marginBottom:'1.5rem', textAlign:'center' }}>
              Upload CSV or Excel files. Get interactive dashboards, product trends, and automatic anomaly alerts.
            </p>
            <div className="reveal reveal-delay-3 cta-group" style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent:'center' }}>
                Explore Dashboard →
              </a>
              <a href="#use-cases" className="btn-secondary" style={{ justifyContent:'center' }}>See Use Cases</a>
            </div>
            <MobileStats />
          </div>
        </div>

        {/* Tech strip */}
        <div className="reveal reveal-delay-4" style={{ display:'flex', flexWrap:'wrap', gap:'6px', justifyContent:'center', alignItems:'center', marginTop:'1.5rem' }}>
          <span style={{ fontSize:'0.75rem', color:'var(--muted)', marginRight:'4px', fontFamily:"'Montserrat',sans-serif", fontWeight:500 }}>Built with</span>
          {['React 19','Node.js','Express','Chart.js','Tailwind CSS','SQL'].map(t=>(
            <span key={t} style={{ fontSize:'0.75rem', fontWeight:600, fontFamily:"'Montserrat',sans-serif", color:'var(--muted)', background:'var(--white)', border:'1px solid var(--border)', padding:'3px 10px', borderRadius:'100px' }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-desktop-grid {
          display: grid;
          grid-template-columns: minmax(0,1fr) auto;
          gap: 3rem;
          align-items: center;
        }
        .hero-mobile-only { display: none; }

        @media (max-width: 720px) {
          .hero-desktop-grid { display: none; }
          .hero-mobile-only  { display: block; }
        }
      `}</style>
    </section>
  )
}
