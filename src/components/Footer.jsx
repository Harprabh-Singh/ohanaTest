import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <footer className="theme-dark" style={{
      background: 'var(--bg-2)',
      padding: 'clamp(40px, 8vh, 80px) clamp(24px, 6vw, 80px) 40px',
      borderTop: '1px solid rgb(var(--fg-rgb) / 0.08)',
      position: 'relative', zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        marginBottom: '60px',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: '1.375rem', fontWeight: 600, color: 'var(--label)',
              letterSpacing: '-0.022em', margin: 0,
            }}>Ohana</p>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--label-2)', lineHeight: 1.6, margin: '0 0 8px' }}>
            Cafe Kitchen & Terraces, Jorhat
          </p>
          <p style={{ fontSize: '12px', color: 'var(--label-3)', letterSpacing: '-0.01em', margin: 0, letterSpacing: '-0.01em' }}>
            Above KFC, Gar-Ali, Jorhat, Assam
          </p>
        </div>

        {/* Links */}
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--label)', margin: '0 0 16px' }}>
            Explore
          </p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {['Home', 'Menu', 'Gallery', 'About', 'Reservations', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={{
                  fontSize: '12px', color: 'var(--label-3)', letterSpacing: '-0.01em', textDecoration: 'none',
                  transition: 'color 0.2s ease', width: 'fit-content',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--label)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--label-3)'; }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Socials & CTA */}
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--label)', margin: '0 0 16px' }}>
            Connect
          </p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
            <a
              href="https://instagram.com/ohana.jrt" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', color: 'var(--label-3)', letterSpacing: '-0.01em', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--label)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--label-3)'; }}
            >
              Instagram @ohana.jrt
            </a>
            <a
              href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', color: 'var(--label-3)', letterSpacing: '-0.01em', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--label)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--label-3)'; }}
            >
              WhatsApp Us
            </a>
          </div>
          
          <Link
            to="/reservations"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid transparent', background: 'var(--accent)', color: 'var(--on-accent)', textDecoration: 'none',
              padding: '9px 20px', borderRadius: '980px',
              fontSize: '14px', fontWeight: 500, letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hi)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; }}
          >
            Reserve Table <span style={{ fontSize: '12px' }}>→</span>
          </Link>
        </div>
      </div>

      {/* Bottom mark */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '20px', borderTop: '1px solid rgb(var(--fg-rgb) / 0.08)',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--label-4)', margin: 0, letterSpacing: '-0.01em' }}>
          © {new Date().getFullYear()} Ohana Kitchen & Café.
        </p>
        <p style={{ fontSize: '12px', color: 'var(--label-4)', margin: 0, letterSpacing: '-0.01em' }}>
          Made with ♥ in Jorhat
        </p>
      </div>
    </footer>
  );
};

export default Footer;
