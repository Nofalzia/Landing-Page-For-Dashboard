const ALERTS = [
  { product:'Butter Croissant',     change:'−38%',   period:'vs. 4-week avg', severity:'high',   label:'Sales Drop' },
  { product:'Cooking Oil (5L)',      change:'+89%',   period:'3-day spike',    severity:'medium', label:'Spike' },
  { product:'Basmati Rice',          change:'56 units',period:'below reorder', severity:'high',   label:'Stockout' },
]

export default function AnomalySection() {
  const W = 320, H = 100
  const normal = [50,52,51,53,50,52,51,54,51,52,50,51,52,50,51]
  const full   = [...normal, 30, 28, 31]
  const max = 60, min = 20

  const toXY = (arr) => arr.map((v, i) => {
    const x = ((i / (full.length - 1)) * W).toFixed(1)
    const y = (H - 10 - ((v - min) / (max - min)) * (H - 20)).toFixed(1)
    return `${x},${y}`
  })

  const normalXY = toXY(normal).join(' ')
  const fullXY   = toXY(full).join(' ')
  const areaXY   = `0,${H} ${fullXY} ${W},${H}`
  const lastNormal = toXY([normal[normal.length-1]])[0]
  const dropPoints = toXY([normal[normal.length-1], 30, 28, 31]).join(' ')
  const anomalyDot = toXY([30])[0]

  return (
    <section id="anomaly" className="section" style={{ background: 'var(--green)' }} aria-label="Anomaly detection">
      <div className="container">

        {/* ── DESKTOP layout ──────────────────────────────── */}
        <div className="anomaly-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <AnomalyCopy alerts={ALERTS} />
          <AnomalyChart W={W} H={H} areaXY={areaXY} normalXY={normalXY} dropPoints={dropPoints} anomalyDot={anomalyDot} />
        </div>

        {/* ── MOBILE layout ───────────────────────────────── */}
        <div className="anomaly-mobile">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="reveal" style={{ fontSize:'0.6875rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#7C9473', marginBottom:'1rem' }}>
              Anomaly Detection
            </div>
            <h2 className="reveal reveal-delay-1" style={{ fontFamily:'"Instrument Serif",serif', fontSize:'clamp(1.875rem,8vw,2.5rem)', lineHeight:1.1, letterSpacing:'-0.015em', color:'#fff', marginBottom:'1rem' }}>
              Spot what deserves your attention.
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontSize:'0.9375rem', color:'rgba(255,255,255,0.65)', lineHeight:1.7 }}>
              Rule-based checks flag unusual patterns automatically.
              No manual scanning. Transparent, interpretable logic.
            </p>
          </div>

          {/* Alert cards — stacked */}
          <div className="reveal reveal-delay-2" style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'1.5rem' }}>
            {ALERTS.map(a => (
              <div key={a.product} style={{
                display:'flex', alignItems:'center', gap:'14px',
                background:'rgba(255,255,255,0.07)',
                borderRadius:'14px', padding:'16px',
                border:`1px solid ${a.severity==='high'?'rgba(190,106,75,0.4)':'rgba(255,255,255,0.12)'}`,
              }}>
                <div style={{ width:'9px', height:'9px', borderRadius:'50%', flexShrink:0, background:a.severity==='high'?'#BE6A4B':'#B8863B', animation:'pulseSoft 2.5s ease-in-out infinite' }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'0.9375rem', fontWeight:700, color:'#fff', marginBottom:'2px' }}>{a.product}</div>
                  <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>{a.period}</div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:'1.125rem', fontWeight:800, color:a.severity==='high'?'#BE6A4B':'#B8863B' }}>{a.change}</div>
                  <div style={{ fontSize:'0.6875rem', fontWeight:600, color:a.severity==='high'?'#BE6A4B':'#B8863B', background:a.severity==='high'?'rgba(190,106,75,0.15)':'rgba(184,134,59,0.15)', padding:'2px 8px', borderRadius:'100px', marginTop:'3px' }}>{a.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="reveal reveal-delay-3" style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'18px', padding:'1.25rem', marginBottom:'1.25rem' }}>
            <div style={{ fontSize:'0.6875rem', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px' }}>
              Sales Pattern — Butter Croissant
            </div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display:'block', height:'80px' }}>
              <defs><linearGradient id="amg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C9473" stopOpacity="0.15"/><stop offset="100%" stopColor="#7C9473" stopOpacity="0"/></linearGradient></defs>
              <polygon points={areaXY} fill="url(#amg)"/>
              <polyline points={normalXY} fill="none" stroke="#7C9473" strokeWidth="2.5" strokeLinejoin="round" className="chart-line"/>
              <polyline points={dropPoints} fill="none" stroke="#BE6A4B" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx={anomalyDot.split(',')[0]} cy={anomalyDot.split(',')[1]} r="5" fill="#BE6A4B"/>
            </svg>
          </div>

          {/* Alert box */}
          <div className="reveal reveal-delay-3" style={{ background:'rgba(190,106,75,0.14)', border:'1.5px solid rgba(190,106,75,0.35)', borderRadius:'14px', padding:'1.25rem' }}>
            <div style={{ fontSize:'0.6875rem', fontWeight:700, color:'#BE6A4B', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>⚠ Unusual Sales Activity</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:'1rem', fontWeight:700, color:'#fff' }}>Butter Croissant</div>
                <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>Friday vs. 4-week average</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:'2rem', fontWeight:900, color:'#BE6A4B', lineHeight:1 }}>−38%</div>
                <div style={{ fontSize:'0.6875rem', color:'rgba(255,255,255,0.4)' }}>Needs attention</div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-4" style={{ marginTop:'1.25rem', fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'1rem' }}>
            Uses threshold checks and percentage deviation against rolling averages. No machine learning. Transparent logic.
          </div>
        </div>
      </div>

      <style>{`
        .anomaly-desktop { display: grid; }
        .anomaly-mobile  { display: none; }
        @media (max-width: 720px) {
          .anomaly-desktop { display: none !important; }
          .anomaly-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function AnomalyCopy({ alerts }) {
  return (
    <div>
      <div className="reveal" style={{ fontSize:'0.6875rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#7C9473', marginBottom:'1.25rem' }}>Anomaly Detection</div>
      <h2 className="reveal reveal-delay-1" style={{ fontFamily:'"Instrument Serif",serif', fontSize:'clamp(2rem,3.5vw,3rem)', lineHeight:1.1, letterSpacing:'-0.015em', color:'#fff', marginBottom:'1.25rem' }}>
        Spot what deserves<br/>your attention.
      </h2>
      <p className="reveal reveal-delay-2" style={{ fontSize:'1rem', color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:'2rem', maxWidth:'400px' }}>
        No manager has time to manually scan every chart every day.
        Rule-based statistical checks flag unusual patterns automatically.
      </p>
      <div className="reveal reveal-delay-3" style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'2rem' }}>
        {alerts.map(a => (
          <div key={a.product} style={{ display:'flex', alignItems:'center', gap:'14px', background:'rgba(255,255,255,0.07)', borderRadius:'12px', padding:'14px 16px', border:`1px solid ${a.severity==='high'?'rgba(190,106,75,0.4)':'rgba(255,255,255,0.12)'}` }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', flexShrink:0, background:a.severity==='high'?'#BE6A4B':'#B8863B', animation:'pulseSoft 2.5s ease-in-out infinite' }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'0.875rem', fontWeight:600, color:'#fff', marginBottom:'2px' }}>{a.product}</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>{a.period}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'1rem', fontWeight:700, color:a.severity==='high'?'#BE6A4B':'#B8863B' }}>{a.change}</div>
              <div style={{ fontSize:'0.6875rem', fontWeight:600, color:a.severity==='high'?'#BE6A4B':'#B8863B', background:a.severity==='high'?'rgba(190,106,75,0.15)':'rgba(184,134,59,0.15)', padding:'2px 7px', borderRadius:'100px', marginTop:'2px', display:'inline-block' }}>{a.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="reveal reveal-delay-4" style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.35)', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'1rem' }}>
        Uses threshold checks and percentage deviation against rolling averages. No machine learning. Transparent, interpretable logic.
      </div>
    </div>
  )
}

function AnomalyChart({ W, H, areaXY, normalXY, dropPoints, anomalyDot }) {
  const cx = anomalyDot.split(',')[0]
  const cy = anomalyDot.split(',')[1]
  return (
    <div className="reveal reveal-delay-2">
      <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'20px', padding:'2rem' }}>
        <div style={{ fontSize:'0.6875rem', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'8px' }}>Sales Pattern — Butter Croissant</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display:'block', height:'130px', marginBottom:'8px' }}>
          <defs><linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C9473" stopOpacity="0.15"/><stop offset="100%" stopColor="#7C9473" stopOpacity="0"/></linearGradient></defs>
          <rect x="0" y="18" width={W} height="42" fill="rgba(124,148,115,0.08)" rx="4"/>
          <polygon points={areaXY} fill="url(#ag2)"/>
          <polyline points={normalXY} fill="none" stroke="#7C9473" strokeWidth="2.5" strokeLinejoin="round" className="chart-line"/>
          <polyline points={dropPoints} fill="none" stroke="#BE6A4B" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx={cx} cy={cy} r="5" fill="#BE6A4B"/>
          <circle cx={cx} cy={cy} r="9" fill="none" stroke="#BE6A4B" strokeWidth="1.5" strokeDasharray="3 2"/>
        </svg>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem' }}>
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><span key={d} style={{ fontSize:'0.6875rem', color:'rgba(255,255,255,0.3)' }}>{d}</span>)}
        </div>
        <div style={{ display:'flex', gap:'1.25rem', marginBottom:'1.5rem' }}>
          {[{c:'#7C9473',l:'Normal range'},{c:'#BE6A4B',l:'Anomaly detected'}].map(l=>(
            <div key={l.l} style={{ display:'flex', alignItems:'center', gap:'7px' }}>
              <div style={{ width:'18px', height:'2.5px', borderRadius:'2px', background:l.c }}/>
              <span style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>{l.l}</span>
            </div>
          ))}
        </div>
        <div style={{ background:'rgba(190,106,75,0.14)', border:'1.5px solid rgba(190,106,75,0.35)', borderRadius:'12px', padding:'1rem' }}>
          <div style={{ fontSize:'0.6875rem', fontWeight:700, color:'#BE6A4B', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'6px' }}>⚠ Unusual Sales Activity</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:'0.9375rem', fontWeight:700, color:'#fff' }}>Butter Croissant</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>Friday vs. 4-week average</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'1.5rem', fontWeight:900, color:'#BE6A4B', lineHeight:1 }}>−38%</div>
              <div style={{ fontSize:'0.6875rem', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>Needs attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
