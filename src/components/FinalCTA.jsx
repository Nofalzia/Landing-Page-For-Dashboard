const DASHBOARD_URL = 'https://retail-analytics-saas.vercel.app'

export default function FinalCTA() {
  return (
    <section aria-label="Call to action" style={{ padding:'5rem 0 4rem', background:'var(--bg)' }}>
      <div className="container">
        <div style={{
          background:'var(--hero-surface)', borderRadius:'28px',
          padding:'clamp(2.5rem, 6vw, 5rem)',
          textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          {/* Rings */}
          {[200,320,440].map((size,i)=>(
            <div key={size} aria-hidden="true" style={{
              position:'absolute', left:'50%', top:'50%',
              width:`${size}px`, height:`${size}px`,
              transform:'translate(-50%,-50%)', borderRadius:'50%',
              border:`1px solid rgba(30,54,45,${0.06-i*0.015})`, pointerEvents:'none',
            }}/>
          ))}

          {/* Floating badges — desktop only */}
          <div aria-hidden="true" className="cta-badges-top" style={{ position:'absolute', top:'2rem', left:'2rem', display:'flex', gap:'6px' }}>
            {['Rs. 2.84M','+12.4%'].map(v=>(
              <span key={v} style={{ fontSize:'0.6875rem', fontWeight:600, background:'rgba(30,54,45,0.08)', color:'var(--green)', padding:'4px 10px', borderRadius:'100px', border:'1px solid rgba(30,54,45,0.15)' }}>{v}</span>
            ))}
          </div>
          <div aria-hidden="true" className="cta-badges-top" style={{ position:'absolute', top:'2rem', right:'2rem', background:'rgba(190,106,75,0.1)', border:'1px solid rgba(190,106,75,0.25)', borderRadius:'100px', padding:'4px 12px', display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#BE6A4B' }}/>
            <span style={{ fontSize:'0.6875rem', fontWeight:600, color:'#BE6A4B' }}>7 anomalies detected</span>
          </div>

          <div style={{ position:'relative', zIndex:1, maxWidth:'580px', margin:'0 auto' }}>
            <div className="eyebrow reveal" style={{ marginBottom:'1.25rem' }}>Get Started</div>
            <h2 className="reveal reveal-delay-1" style={{ fontFamily:'"Instrument Serif",serif', fontSize:'clamp(2rem,5vw,3.5rem)', lineHeight:1.08, letterSpacing:'-0.02em', color:'var(--text)', marginBottom:'1.25rem' }}>
              Turn scattered retail data into something you can act on.
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontSize:'1rem', color:'var(--muted)', lineHeight:1.65, marginBottom:'2.5rem' }}>
              Explore the live dashboard with demo data, or bring your own CSV
              and Excel files to see how your retail numbers look when properly organized.
            </p>
            <div className="reveal reveal-delay-3 cta-group" style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize:'0.9375rem', padding:'0.875rem 2rem' }}>
                Explore the Dashboard
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://github.com/Nofalzia/Retail_Analytics_Dashboard" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize:'0.9375rem', padding:'0.875rem 1.75rem' }}>
                <GithubIcon/> View on GitHub
              </a>
            </div>
            <p className="reveal reveal-delay-4" style={{ marginTop:'2rem', fontSize:'0.8125rem', color:'var(--muted)' }}>
              Final Year Project · Bahria University Islamabad · 2026
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .cta-badges-top { display: none !important; }
          .cta-group { flex-direction: column !important; }
          .cta-group a { justify-content: center; }
        }
      `}</style>
    </section>
  )
}

function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
}
