import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/create', label: 'Create Crewmate' },
  { to: '/gallery', label: 'Crewmate Gallery' },
]

const getNavClassName = ({ isActive }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link'

const Layout = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">WEB102 Week 8</p>
          <h1 className="brand-title">Crewmates</h1>
          <p className="brand-copy">
            Assemble a custom squad, save it in Supabase, and manage every crewmate
            from one gallery.
          </p>
        </div>

        <nav className="nav-list" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} className={getNavClassName} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="sidebar-card__label">Mission brief</p>
          <p className="sidebar-card__copy">
            Required features: create, summary view, detail routes, edit, and delete.
          </p>
        </div>
      </aside>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
