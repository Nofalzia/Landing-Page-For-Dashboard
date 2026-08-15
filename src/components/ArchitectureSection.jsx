const LAYERS = [
  { label:'Data Sources',  items:['CSV Files','Excel (.xlsx)'],         color:'#B8863B', icon:<DataIcon/>,   desc:'Your existing retail exports and reports' },
  { label:'Presentation',  items:['React 19','Chart.js','Tailwind CSS'],color:'#7C9473', icon:<UIIcon/>,     desc:'Interactive dashboards, charts, and KPI visualizations' },
  { label:'Application',   items:['Node.js','Express.js'],              color:'#1E362D', icon:<ServerIcon/>, desc:'Data processing, business logic, and API layer' },
  { label:'Data Layer',    items:['SQL Database'],                      color:'#71717A', icon:<DBIcon/>,     desc:'Structured storage for sales and inventory data' },
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section" style={{ background:'var(--bg)' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="arch-grid">

          {/* Left */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom:'1rem' }}>Architecture</div>
            <h2 className="headline-section reveal reveal-delay-1" style={{ marginBottom:'1.25rem' }}>Built from<br/>the ground up.</h2>
            <p className="reveal reveal-delay-2" style={{ fontSize:'1rem', color:'var(--muted)', lineHeight:1.7, marginBottom:'2rem' }}>
              A standard three-tier web architecture — frontend, backend, and database — built entirely with open-source, industry-standard tools.
            </p>
            <div className="reveal reveal-delay-3" style={{ display:'flex', flexDirection:'column', gap:'14px', marginBottom:'2rem' }}>
              {LAYERS.map(l=>(
                <div key={l.label} style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'10px', flexShrink:0, background:`${l.color}15`, display:'flex', alignItems:'center', justifyContent:'center', color:l.color, marginTop:'2px' }}>{l.icon}</div>
                  <div>
                    <div style={{ fontSize:'0.9375rem', fontWeight:600, color:'var(--text)', marginBottom:'2px' }}>
                      {l.label}
                      <span style={{ fontWeight:400, color:'var(--muted)', marginLeft:'8px', fontSize:'0.8125rem' }}>{l.items.join(' · ')}</span>
                    </div>
                    <div style={{ fontSize:'0.8125rem', color:'var(--muted)' }}>{l.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-4">
              <a href="https://github.com/Nofalzia/Retail_Analytics_Dashboard" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <GithubIcon/> View Source Code
              </a>
            </div>
          </div>

          {/* Right — flow diagram */}
          <div className="reveal reveal-delay-2">
            <div style={{ background:'var(--white)', borderRadius:'20px', border:'1px solid var(--border)', padding:'2rem', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize:'0.6875rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'1.75rem' }}>Data Flow</div>
              <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
                {['Sales.xlsx','Inventory.csv','POS_Export.xlsx'].map(f=>(
                  <div key={f} style={{ flex:1, background:'rgba(184,134,59,0.08)', border:'1px solid rgba(184,134,59,0.2)', borderRadius:'10px', padding:'10px 8px', textAlign:'center' }}>
                    <div style={{ fontSize:'16px', marginBottom:'4px' }}>📄</div>
                    <div style={{ fontSize:'0.6875rem', color:'#B8863B', fontWeight:500 }}>{f}</div>
                  </div>
                ))}
              </div>
              {[
                { l:LAYERS[2], extra:'Validation · API routing · CSV parsing', arrow:'Upload & parse' },
                { l:LAYERS[3], extra:'Sales · Inventory · Products · Anomalies', arrow:'Store & query' },
                { l:LAYERS[1], extra:'Dashboards · Charts · KPI cards · Alerts', arrow:'Fetch & render' },
              ].map((item, i) => (
                <div key={item.l.label}>
                  <FlowArrow label={item.arrow}/>
                  <div style={{ background:`${item.l.color}09`, border:`1.5px solid ${item.l.color}25`, borderRadius:'14px', padding:'14px', display:'flex', alignItems:'center', gap:'12px' }}>
                    <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:`${item.l.color}18`, display:'flex', alignItems:'center', justifyContent:'center', color:item.l.color, flexShrink:0 }}>{item.l.icon}</div>
                    <div>
                      <div style={{ fontSize:'0.875rem', fontWeight:700, color:'var(--text)', marginBottom:'2px' }}>
                        {item.l.label}
                        <span style={{ fontWeight:500, marginLeft:'8px', fontSize:'0.75rem', color:item.l.color }}>{item.l.items.join(' · ')}</span>
                      </div>
                      <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{item.extra}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .arch-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

function FlowArrow({ label }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'6px 0', gap:'2px' }}>
      <div style={{ width:'1.5px', height:'16px', background:'var(--border-strong)' }}/>
      <span style={{ fontSize:'0.6875rem', color:'var(--muted)', fontWeight:500 }}>{label}</span>
      <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true"><path d="M5 7L0 0h10L5 7z" fill="var(--border-strong)"/></svg>
    </div>
  )
}

function DataIcon()   { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="2" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="9" width="6" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="12" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg> }
function UIIcon()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 6h14" stroke="currentColor" strokeWidth="1.5"/><rect x="4.5" y="8.5" width="4" height="3" rx="1" stroke="currentColor" strokeWidth="1.25"/></svg> }
function ServerIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="5" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="10" width="14" height="5" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="13.5" cy="5.5" r="1" fill="currentColor"/><circle cx="13.5" cy="12.5" r="1" fill="currentColor"/></svg> }
function DBIcon()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><ellipse cx="9" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 5v8c0 1.381 3.134 2.5 7 2.5s7-1.119 7-2.5V5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 9c0 1.381 3.134 2.5 7 2.5s7-1.119 7-2.5" stroke="currentColor" strokeWidth="1.5"/></svg> }
function GithubIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> }
