import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return; // throttle to one update per animation frame
      rafId = requestAnimationFrame(() => {
        setSolid(window.scrollY > 80 || location.pathname !== '/');
        rafId = null;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navBg = 'theme-dark material-bar border-b border-[color:rgb(var(--fg-rgb)/0.08)]';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${navBg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-1 min-[701px]:py-1.5 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          {/* Universal Logo */}
            <div className="flex flex-col items-center gap-[0.1em]">
              <svg className="w-[15px] h-[15px] text-[color:var(--accent)] -mb-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21v-7"/>
              <path d="M12 14c-2.5-2.5-6-1.5-6 2.5 0 2.5 2.5 3.5 6 1.5"/>
              <path d="M12 14c2.5-2.5 6-1.5 6 2.5 0 2.5-2.5 3.5-6 1.5"/>
              <path d="M12 14c-1.5-3.5 0-6 2.5-6 2.5 0 3.5 2.5 1.5 6"/>
            </svg>
              <strong className="text-[color:var(--label)] text-[21px] tracking-[-0.025em] leading-none font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Ohana<span className="text-[color:var(--accent)]">.</span></strong>
              <span className="flex items-center justify-center text-[color:var(--label-3)] text-[8px] tracking-[0.08em] font-medium uppercase">
                <span className="mx-1 font-light">—</span>
                Kitchen & Café
                <span className="mx-1 font-light">—</span>
              </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative text-[12px] font-normal tracking-[-0.01em] transition duration-300 ${active ? 'text-[color:var(--label)]' : 'text-[color:rgb(var(--fg-rgb)/0.70)] hover:text-[color:var(--label)]'}`}
              >
                {item.label}
                <span className={`absolute left-0 -bottom-1 h-px bg-[color:var(--label)] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            to="/reservations"
            className="rounded-full bg-[color:var(--accent)] text-white px-4 py-[7px] text-[12px] font-medium tracking-[-0.01em] transition hover:bg-[color:var(--accent-hi)]"
          >
            Reserve a Table
          </Link>
        </div>

        <button onClick={() => setMenuOpen((open) => !open)} className="inline-flex items-center justify-center lg:hidden focus:outline-none">
          <div className="flex items-center gap-2 text-[color:var(--label)]">
            {menuOpen ? (
              <X className="h-7 w-7 stroke-[1.5]" />
            ) : (
              <div className="flex flex-col gap-[5px]">
                <span className="w-[22px] h-[1.5px] bg-[color:var(--label)] block rounded-full"></span>
                <span className="w-[22px] h-[1.5px] bg-[color:var(--label)] block rounded-full"></span>
                <span className="w-[22px] h-[1.5px] bg-[color:var(--label)] block rounded-full"></span>
              </div>
            )}
            <ChevronDown className={`h-[14px] w-[14px] stroke-[2.5] transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
      </div>

      <div 
        className={`lg:hidden absolute top-[90%] right-4 w-[280px] material-sheet rounded-[22px] border shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'max-h-[600px] border-[color:rgb(var(--fg-rgb)/0.1)] opacity-100 mt-2' : 'max-h-0 border-transparent opacity-0 mt-0'}`}
      >
        <div className="flex flex-col pt-4 pb-6 px-6">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link 
                key={item.href} 
                to={item.href} 
                className={`group flex items-center justify-between py-3.5 border-b border-[color:rgb(var(--fg-rgb)/0.08)] transition-all duration-300 ${active ? 'text-[color:var(--label)]' : 'text-[color:rgb(var(--fg-rgb)/0.60)] hover:text-[color:var(--label)]'}`}
              >
                <span style={{ fontFamily: 'var(--font-display)' }} className="text-[22px] font-semibold tracking-[-0.02em]">{item.label}</span>
                <span className={`text-[color:var(--accent)] transition-all duration-300 transform ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>→</span>
              </Link>
            );
          })}
          <Link 
            to="/reservations" 
            className="mt-6 rounded-full bg-[color:var(--accent)] text-white px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-center transition hover:bg-[color:var(--accent-hi)]"
          >
            Reserve a Table
          </Link>
        </div>
      </div>

      {location.pathname === '/' && (
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl items-center justify-between px-5 pb-4 md:px-8">
          
          
        </div>
      )}
    </header>
  ); 
};

export default Navbar;
