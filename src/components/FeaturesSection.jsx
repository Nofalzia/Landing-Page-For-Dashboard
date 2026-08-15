import { useState } from 'react'

const FEATURES = [
  {
    n: '01', title: 'Sales Analytics',
    body: 'Understand how revenue moves over time. Track daily, weekly, and monthly trends. Spot genuine growth vs. noise.',
    visual: <SalesViz />,
  },
  {
    n: '02', title: 'Product Performance',
    body: 'See which products carry the most revenue and which are quietly underperforming. Compare categories. Focus where it counts.',
    visual: <ProductViz />,
  },
  {
    n: '03', title: 'Inventory Visibility',
    body: 'Know what stock is on hand, what is moving fast, and what might run out. Sales and inventory in one place for the first time.',
    visual: <InventoryViz />,
  },
  {
    n: '04', title: 'Anomaly Detection',
    body: 'Rule-based statistical checks flag unusual patterns automatically. No manual scanning — the dashboard brings problems to you.',
    visual: <AnomalyViz />,
  },
  {
    n: '05', title: 'Role-Based Views',
    body: 'Business owners see high-level KPIs. Store managers see operational detail. Each role gets the view that is actually useful.',
    visual: <RolesViz />,
  },
  {
    n: '06', title: 'CSV + Excel Import',
    body: 'Upload your existing exports directly. No reformatting, no new tools, no IT department. Works with any standard retail data file.',
    visual: <ImportViz />,
  },
]

export default function FeaturesSection() {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState(null)

  return (
    <section id="features" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '1rem' }}>Features</div>
          <h2 className="headline-section reveal reveal-delay-1">
            Everything you need<br/>to understand performance.
          </h2>
        </div>

        {/* ── DESKTOP: interactive two-column ───────────────── */}
        <div className="features-desktop reveal reveal-delay-2">
          <div role="tablist" aria-label="Feature details" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FEATURES.map((f, i) => (
              <button
                key={f.n}
                role="tab"
                aria-selected={active === i}
                aria-controls={`fp-${i}`}
                id={`ft-${i}`}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', width: '100%', textAlign: 'left',
                  alignItems: 'flex-start', gap: '1.25rem',
                  padding: '1.25rem', borderRadius: '12px', border: 'none',
                  cursor: 'pointer', background: 'none', outline: 'none',
                  transition: 'background 0.2s',
                  ...(active === i
                    ? { background: 'var(--white)', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid var(--border)' }
                    : { border: '1px solid transparent' }
                  ),
                }}
              >
                <span className="feat-num" style={{ paddingTop: '3px', color: active === i ? 'var(--green)' : 'var(--muted)' }}>{f.n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: active === i ? '8px' : 0, transition: 'margin 0.2s' }}>{f.title}</div>
                  {active === i && <div style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.body}</div>}
                </div>
                {active === i && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: '7px' }} />}
              </button>
            ))}
          </div>

          {/* Visual panel */}
          <div style={{ position: 'sticky', top: '5rem' }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.n}
                id={`fp-${i}`}
                role="tabpanel"
                aria-labelledby={`ft-${i}`}
                hidden={active !== i}
                style={{
                  background: 'var(--white)', borderRadius: '20px',
                  border: '1px solid var(--border)', overflow: 'hidden',
                  minHeight: '360px', display: active === i ? 'flex' : 'none',
                  flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                  <span className="feat-num">{f.n}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>{f.title}</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem' }}>{f.visual}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: accordion ─────────────────────────────── */}
        <div className="features-mobile reveal reveal-delay-2">
          {FEATURES.map((f, i) => {
            const isOpen = openMobile === i
            return (
              <div key={f.n} style={{ borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '10px', overflow: 'hidden', background: 'var(--white)' }}>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  className="tap-target"
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '1rem', padding: '1.125rem 1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', minHeight: '56px',
                  }}
                >
                  <span className="feat-num" style={{ color: isOpen ? 'var(--green)' : 'var(--muted)', flexShrink: 0 }}>{f.n}</span>
                  <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>{f.title}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--muted)' }}
                    aria-hidden="true"
                  >
                    <path d="M4 6l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>{f.body}</p>
                    <div style={{ background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', padding: '1rem' }}>
                      {f.visual}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .features-desktop {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .features-mobile { display: none; }

        @media (max-width: 720px) {
          .features-desktop { display: none !important; }
          .features-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  )
}

/* ── Feature visuals (unchanged) ─────────────────────────── */
function SalesViz() {
  const data = [42,55,48,68,62,75,58,80,72,88,66,92]
  const W = 260, H = 110
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i/(data.length-1))*W
    const y = H-16-((v-min)/(max-min))*(H-32)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        {[{ l:'Revenue',v:'Rs. 2.84M',c:'+12.4%'},{ l:'Avg Daily',v:'Rs. 94.7K',c:'+8.1%'}].map(k=>(
          <div key={k.l} style={{ flex:1, background:'var(--bg)', borderRadius:'10px', padding:'12px', border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'0.6875rem', color:'var(--muted)', marginBottom:'4px' }}>{k.l}</div>
            <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text)' }}>{k.v}</div>
            <div style={{ fontSize:'0.6875rem', color:'#16a34a', fontWeight:500 }}>{k.c}</div>
          </div>
        ))}
      </div>
      <div style={{ background:'var(--bg)', borderRadius:'12px', padding:'14px', border:'1px solid var(--border)' }}>
        <div style={{ fontSize:'0.6875rem', color:'var(--muted)', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.08em' }}>Revenue — Last 12 Weeks</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height:'90px', display:'block' }}>
          <defs><linearGradient id="svz" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C9473" stopOpacity="0.25"/><stop offset="100%" stopColor="#7C9473" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#svz)"/>
          <polyline points={pts} fill="none" stroke="#7C9473" strokeWidth="2.5" strokeLinejoin="round" className="chart-line"/>
        </svg>
      </div>
    </div>
  )
}
function ProductViz() {
  const rows = [
    { name:'Basmati Rice', pct:82, trend:'+14%', pos:true },
    { name:'Cooking Oil',  pct:65, trend:'+7%',  pos:true },
    { name:'Detergent',    pct:48, trend:'−3%',  pos:false },
    { name:'Sugar (5kg)',  pct:34, trend:'+2%',  pos:true  },
    { name:'Flour (10kg)', pct:22, trend:'−11%', pos:false },
  ]
  return (
    <div>
      <div style={{ fontSize:'0.6875rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>Product Revenue Share</div>
      {rows.map(p=>(
        <div key={p.name} style={{ marginBottom:'10px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
            <span style={{ fontSize:'0.875rem', fontWeight:500, color:'var(--text)' }}>{p.name}</span>
            <span style={{ fontSize:'0.75rem', color:p.pos?'#16a34a':'#BE6A4B', fontWeight:600 }}>{p.trend}</span>
          </div>
          <div style={{ height:'4px', background:'var(--bg)', borderRadius:'100px' }}>
            <div style={{ height:'4px', width:`${p.pct}%`, borderRadius:'100px', background:p.pos?'#7C9473':'#BE6A4B' }}/>
          </div>
        </div>
      ))}
    </div>
  )
}
function InventoryViz() {
  const rows = [
    { name:'Basmati Rice', units:840, status:'OK',       c:'#16a34a' },
    { name:'Cooking Oil',  units:212, status:'Low',      c:'#B8863B' },
    { name:'Detergent',    units:56,  status:'Critical', c:'#BE6A4B' },
    { name:'Sugar',        units:1200,status:'OK',       c:'#16a34a' },
    { name:'Tea Bags',     units:88,  status:'Low',      c:'#B8863B' },
  ]
  return (
    <div>
      <div style={{ fontSize:'0.6875rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>Inventory Status</div>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8125rem' }}>
        <thead><tr style={{ borderBottom:'1px solid var(--border)' }}>{['Product','Units','Status'].map(h=>(<th key={h} style={{ textAlign:'left', padding:'6px 8px', color:'var(--muted)', fontWeight:500, fontSize:'0.6875rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</th>))}</tr></thead>
        <tbody>{rows.map(it=>(<tr key={it.name} style={{ borderBottom:'1px solid var(--border)' }}><td style={{ padding:'9px 8px', color:'var(--text)', fontWeight:500 }}>{it.name}</td><td style={{ padding:'9px 8px', color:'var(--muted)' }}>{it.units.toLocaleString()}</td><td style={{ padding:'9px 8px' }}><span style={{ fontSize:'0.6875rem', fontWeight:600, padding:'3px 8px', borderRadius:'100px', background:`${it.c}18`, color:it.c }}>{it.status}</span></td></tr>))}</tbody>
      </table>
    </div>
  )
}
function AnomalyViz() {
  return (
    <div>
      <div style={{ background:'rgba(190,106,75,0.07)', border:'1.5px solid rgba(190,106,75,0.2)', borderRadius:'12px', padding:'14px', marginBottom:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#BE6A4B', animation:'pulseSoft 2.5s ease-in-out infinite' }}/>
          <span style={{ fontSize:'0.6875rem', fontWeight:700, color:'#BE6A4B', textTransform:'uppercase', letterSpacing:'0.06em' }}>Anomaly Detected</span>
        </div>
        <div style={{ fontSize:'0.9375rem', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>Pastry sales dropped −38%</div>
        <div style={{ fontSize:'0.8125rem', color:'var(--muted)' }}>Thursday–Friday vs. 4-week average</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
        {[{ l:'Threshold check', v:'±25%' },{ l:'Rolling window', v:'4 weeks' },{ l:'Confidence', v:'High' },{ l:'Action', v:'Review' }].map(s=>(
          <div key={s.l} style={{ background:'var(--bg)', borderRadius:'10px', padding:'10px', border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'0.6875rem', color:'var(--muted)', marginBottom:'3px' }}>{s.l}</div>
            <div style={{ fontSize:'0.875rem', fontWeight:700, color:'var(--text)' }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function RolesViz() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
      {[
        { role:'Business Owner', color:'#1E362D', items:['Total Revenue','Overall Trend','Top Categories','Month-on-Month'] },
        { role:'Store Manager',  color:'#B8863B', items:['Daily Transactions','Product Detail','Inventory Status','Anomaly Alerts'] },
      ].map(r=>(
        <div key={r.role} style={{ background:'var(--bg)', borderRadius:'12px', padding:'14px', border:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
            <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:r.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" fill="rgba(255,255,255,0.7)"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontSize:'0.875rem', fontWeight:600, color:'var(--text)' }}>{r.role}</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {r.items.map(item=>(<span key={item} style={{ fontSize:'0.6875rem', fontWeight:500, background:`${r.color}12`, color:r.color, padding:'4px 10px', borderRadius:'100px' }}>{item}</span>))}
          </div>
        </div>
      ))}
    </div>
  )
}
function ImportViz() {
  return (
    <div>
      {[
        { name:'Sales_July_2025.xlsx', size:'124 KB', ok:true  },
        { name:'Inventory_Q3.csv',     size:'86 KB',  ok:true  },
        { name:'POS_Export_Aug.xlsx',  size:'98 KB',  ok:false },
      ].map(f=>(
        <div key={f.name} style={{ display:'flex', alignItems:'center', gap:'10px', background:'var(--bg)', borderRadius:'10px', padding:'11px', border:'1px solid var(--border)', marginBottom:'8px' }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'7px', background:f.ok?'rgba(22,163,74,0.1)':'rgba(184,134,59,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="9" height="14" rx="2" stroke={f.ok?'#16a34a':'#B8863B'} strokeWidth="1.25"/><path d="M11 1v4h4" stroke={f.ok?'#16a34a':'#B8863B'} strokeWidth="1.25" strokeLinecap="round"/></svg>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'0.8125rem', fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
            <div style={{ fontSize:'0.6875rem', color:'var(--muted)' }}>{f.size}</div>
          </div>
          <span style={{ fontSize:'0.6875rem', fontWeight:600, background:f.ok?'rgba(22,163,74,0.1)':'rgba(184,134,59,0.1)', color:f.ok?'#16a34a':'#B8863B', padding:'3px 8px', borderRadius:'100px', flexShrink:0 }}>
            {f.ok?'Processed':'Pending'}
          </span>
        </div>
      ))}
      <div style={{ textAlign:'center', padding:'12px', background:'rgba(30,54,45,0.06)', borderRadius:'10px', border:'1.5px dashed rgba(30,54,45,0.2)' }}>
        <div style={{ fontSize:'0.875rem', color:'var(--green)', fontWeight:600, marginBottom:'3px' }}>+ Upload CSV or Excel</div>
        <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>Drag and drop or click to browse</div>
      </div>
    </div>
  )
}
