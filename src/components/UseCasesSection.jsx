import { useState } from 'react'

const USE_CASES = [
  {
    id: 'tehzeeb',
    retailer: 'Tehzeeb Bakers',
    type: 'Bakery Chain',
    location: 'Islamabad · Rawalpindi',
    description: 'Track daily sales across branches, monitor product movement, and catch underperforming categories before they hurt revenue.',
    kpis: [
      { label: 'Revenue',  value: 'Rs. 8.2M', change: '+14.3%', positive: true },
      { label: 'Products', value: '142',       change: '6 new',  positive: true },
      { label: 'Flagged',  value: '3',         change: 'Review', positive: false },
    ],
    products: [
      { name: 'Chocolate Cake (1kg)', pct: 78, value: 'Rs. 2.79M' },
      { name: 'Black Forest Pastry',  pct: 62, value: 'Rs. 2.30M' },
      { name: 'Butter Croissant',     pct: 42, value: 'Rs. 1.48M' },
      { name: 'Cream Roll',           pct: 28, value: 'Rs. 0.98M' },
    ],
    anomaly: { title: 'Pastry sales dropped −38%', body: 'Thursday–Friday vs. 4-week average.' },
    chartData: [55,62,58,71,66,78,70,83,76,89,72,92,80,95,74,98,84,97,88,100],
    accent: '#B8863B',
  },
  {
    id: 'imtiaz',
    retailer: 'Imtiaz Cash & Carry',
    type: 'Wholesale Supermarket',
    location: 'Karachi',
    description: 'Manage thousands of SKUs, track bulk product movement across categories, and catch stockout risks before shelves go empty.',
    kpis: [
      { label: 'Revenue',  value: 'Rs. 47.3M', change: '+9.7%',    positive: true },
      { label: 'SKUs',     value: '6,840',      change: '18 cats',  positive: true },
      { label: 'Stockouts',value: '12',         change: '4 critical', positive: false },
    ],
    products: [
      { name: 'Basmati Rice (5kg)',    pct: 82, value: 'Rs. 10.4M' },
      { name: 'Dalda Cooking Oil (5L)',pct: 68, value: 'Rs. 8.5M'  },
      { name: 'Surf Excel (3kg)',      pct: 50, value: 'Rs. 6.6M'  },
      { name: 'Tapal Danedar (900g)', pct: 38, value: 'Rs. 5.2M'  },
    ],
    anomaly: { title: 'Beverages: critical stock', body: '4 SKUs below reorder point. ~2 days left.' },
    chartData: [60,68,65,75,70,82,75,88,80,92,77,95,85,98,80,100,90,96,92,99],
    accent: '#7C9473',
  },
  {
    id: 'alfatah',
    retailer: 'Al-Fatah Superstore',
    type: 'Department Store',
    location: 'Lahore',
    description: 'Understand which clothing categories are driving seasonal revenue, and investigate unexpected spikes before they become problems.',
    kpis: [
      { label: 'Revenue',    value: 'Rs. 15.8M', change: '+22.1%',      positive: true },
      { label: 'Categories', value: '24',         change: 'tracked',     positive: true },
      { label: 'Spikes',     value: '2',          change: 'Investigate', positive: false },
    ],
    products: [
      { name: "Men's Formal Wear", pct: 85, value: 'Rs. 4.9M' },
      { name: "Women's Casual",    pct: 70, value: 'Rs. 4.1M' },
      { name: "Kids' Clothing",    pct: 50, value: 'Rs. 3.0M' },
      { name: 'Accessories',       pct: 35, value: 'Rs. 2.2M' },
    ],
    anomaly: { title: 'Accessories spiked +67%', body: 'Unusually high vs. 4-week average. Possible trend or data error.' },
    chartData: [50,60,55,68,62,74,68,80,74,85,70,90,78,94,72,98,82,100,88,96],
    accent: '#1E362D',
  },
]

function miniPath(data, w, h) {
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - 8 - ((v - min) / (max - min)) * (h - 16)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return { line: pts.join(' '), area: `0,${h} ${pts.join(' ')} ${w},${h}` }
}

/* ── Progress ring ───────────────────────────────────────── */
function Ring({ pct, color, size = 64 }) {
  const r = size / 2 - 6
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5"/>
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s' }}
      />
    </svg>
  )
}

/* ── Mobile KPI ring cards ───────────────────────────────── */
function MobileKPIs({ kpis, accent }) {
  const ringPcts = [74, 88, 32]
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1.25rem' }}>
      {kpis.map((k, i) => (
        <div key={k.label} style={{
          flex: 1, background: 'var(--bg)',
          borderRadius: '14px', padding: '14px 10px',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <Ring pct={ringPcts[i]} color={k.positive ? accent : '#BE6A4B'} size={52}/>
          <div style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1, textAlign: 'center' }}>
            {k.value}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3 }}>{k.label}</div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: k.positive ? '#16a34a' : '#BE6A4B', textAlign: 'center' }}>
            {k.change}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Desktop KPI row ─────────────────────────────────────── */
function DesktopKPIs({ kpis }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '1.5rem' }}>
      {kpis.map(k => (
        <div key={k.label} style={{ background: 'var(--bg)', borderRadius: '10px', padding: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--muted)', marginBottom: '6px' }}>{k.label}</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.1 }}>{k.value}</div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: k.positive ? '#16a34a' : '#BE6A4B' }}>{k.change}</div>
        </div>
      ))}
    </div>
  )
}

function UseCasePanel({ uc }) {
  const { line, area } = miniPath(uc.chartData, 260, 80)
  return (
    <div style={{
      background: 'var(--white)', borderRadius: '20px',
      border: '1px solid var(--border)', overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      {/* Header */}
      <div style={{ padding: '1.5rem 1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(1.35rem, 4vw, 1.625rem)', letterSpacing: '-0.01em', margin: '0 0 3px', color: 'var(--text)' }}>
              {uc.retailer}
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{uc.type} · {uc.location}</div>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', background: 'rgba(0,0,0,0.04)', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Demo Data</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, margin: '0.75rem 0 1.25rem' }}>{uc.description}</p>
      </div>

      {/* Mobile KPIs (rings) */}
      <div className="uc-mobile-kpis" style={{ padding: '0 1.25rem 1.25rem' }}>
        <MobileKPIs kpis={uc.kpis} accent={uc.accent} />
      </div>

      {/* Desktop KPIs + chart side by side */}
      <div className="uc-desktop-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '0 1.5rem 1.5rem' }}>
        {/* Left */}
        <div>
          <DesktopKPIs kpis={uc.kpis} />
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Top Products</div>
          {uc.products.map(p => (
            <div key={p.name} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)' }}>{p.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.value}</span>
              </div>
              <div style={{ height: '4px', background: 'var(--bg)', borderRadius: '100px' }}>
                <div style={{ height: '4px', width: `${p.pct}%`, borderRadius: '100px', background: uc.accent }} />
              </div>
            </div>
          ))}
        </div>
        {/* Right — chart + anomaly */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'var(--bg)', borderRadius: '14px', padding: '1.25rem', border: '1px solid var(--border)', flex: 1 }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>30-Day Sales Trend</div>
            <svg width="100%" viewBox="0 0 260 80" preserveAspectRatio="none" style={{ display: 'block', height: '90px', marginBottom: '6px' }}>
              <defs>
                <linearGradient id={`ucg-${uc.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={uc.accent} stopOpacity="0.2"/>
                  <stop offset="100%" stopColor={uc.accent} stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points={area} fill={`url(#ucg-${uc.id})`}/>
              <polyline points={line} fill="none" stroke={uc.accent} strokeWidth="2.5" strokeLinejoin="round" className="chart-line"/>
            </svg>
          </div>
          <div style={{ background: 'rgba(190,106,75,0.07)', border: '1.5px solid rgba(190,106,75,0.22)', borderRadius: '14px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#BE6A4B', animation: 'pulseSoft 2.5s ease-in-out infinite' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#BE6A4B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Anomaly</span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{uc.anomaly.title}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{uc.anomaly.body}</div>
          </div>
          <a href="https://retail-analytics-saas.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: 'var(--green-light)', color: 'var(--green)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(30,54,45,0.15)' }}>
            Try with your own data →
          </a>
        </div>
      </div>

      {/* Mobile products + anomaly */}
      <div className="uc-mobile-body" style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Top Products</div>
          {uc.products.slice(0, 3).map(p => (
            <div key={p.name} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>{p.name}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{p.value}</span>
              </div>
              <div style={{ height: '5px', background: 'var(--bg)', borderRadius: '100px', border: '1px solid var(--border)' }}>
                <div style={{ height: '5px', width: `${p.pct}%`, borderRadius: '100px', background: uc.accent }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(190,106,75,0.07)', border: '1.5px solid rgba(190,106,75,0.22)', borderRadius: '14px', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#BE6A4B', animation: 'pulseSoft 2.5s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#BE6A4B', textTransform: 'uppercase' }}>Anomaly Detected</span>
          </div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{uc.anomaly.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{uc.anomaly.body}</div>
        </div>
        <a href="https://retail-analytics-saas.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center', fontSize: '0.9375rem' }}>
          Try with your own data →
        </a>
      </div>
    </div>
  )
}

export default function UseCasesSection() {
  const [active, setActive] = useState('tehzeeb')
  const current = USE_CASES.find(u => u.id === active)

  return (
    <section id="use-cases" className="section" style={{ background: 'var(--hero-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Use Cases</div>
          <h2 className="headline-section reveal reveal-delay-1" style={{ marginBottom: '1rem' }}>
            One platform.<br/>Every kind of retailer.
          </h2>
          <p className="reveal reveal-delay-2" style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
            The same dashboard adapts to a bakery chain, a wholesale supermarket,
            or a department store — because the analytics problem is universal.
          </p>
        </div>

        {/* Tab strip — swipeable on mobile */}
        <div
          role="tablist"
          aria-label="Retailer use cases"
          className="scroll-x reveal reveal-delay-2"
          style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', paddingBottom: '4px' }}
        >
          {USE_CASES.map(uc => (
            <button
              key={uc.id}
              role="tab"
              aria-selected={active === uc.id}
              aria-controls={`panel-${uc.id}`}
              id={`tab-${uc.id}`}
              onClick={() => setActive(uc.id)}
              className="snap-start tap-target"
              style={{
                flexShrink: 0,
                padding: '10px 18px', borderRadius: '100px', border: 'none',
                cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
                transition: 'all 0.25s', minHeight: '48px',
                background: active === uc.id ? 'var(--green)' : 'rgba(255,255,255,0.75)',
                color: active === uc.id ? '#fff' : 'var(--muted)',
                boxShadow: active === uc.id ? '0 2px 8px rgba(30,54,45,0.25)' : 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px',
              }}
            >
              <span>{uc.retailer}</span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 400, opacity: 0.7 }}>{uc.location}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        {USE_CASES.map(uc => (
          <div key={uc.id} id={`panel-${uc.id}`} role="tabpanel" aria-labelledby={`tab-${uc.id}`} hidden={active !== uc.id}>
            {active === uc.id && <UseCasePanel uc={uc} />}
          </div>
        ))}

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1.25rem' }}>
          All figures are demo data for illustration only.
        </p>
      </div>

      <style>{`
        /* Desktop: show desktop body, hide mobile */
        .uc-desktop-body { display: grid; }
        .uc-mobile-kpis  { display: none; }
        .uc-mobile-body  { display: none; }

        @media (max-width: 680px) {
          .uc-desktop-body { display: none !important; }
          .uc-mobile-kpis  { display: block !important; }
          .uc-mobile-body  { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
