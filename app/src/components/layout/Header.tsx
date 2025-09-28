import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import Button from '@/components/ui/Button';
import { publicNavigation, adminNavigation } from '@/config/navigation';
import { useFeatureFlags } from '@/providers/FeatureFlagProvider';
import { useAdmin } from '@/providers/AdminProvider';

const Header = () => {
  const { flags } = useFeatureFlags();
  const { isAdmin } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = publicNavigation.filter((item) =>
    item.requiresFlag ? flags[item.requiresFlag] : true
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">??</span>
          <span>ONG Cães</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx('transition-colors hover:text-primary', isActive ? 'text-primary' : undefined)
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild>
            <a href="#doacoes">Apoie</a>
          </Button>
          {isAdmin ? (
            <NavLink to="/admin" className="text-sm font-semibold text-secondary">
              Área admin
            </NavLink>
          ) : null}
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label="Abrir menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">?</span>
        </button>
      </div>
      {isMenuOpen ? (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-6 text-sm text-slate-700">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx('rounded-lg px-3 py-2 hover:bg-primary/10 hover:text-primary', isActive ? 'bg-primary/10 text-primary' : undefined)
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild>
              <a href="#doacoes">Apoie</a>
            </Button>
            {isAdmin ? (
              <NavLink to="/admin" className="font-semibold text-secondary" onClick={() => setIsMenuOpen(false)}>
                Área admin
              </NavLink>
            ) : null}
          </nav>
        </div>
      ) : null}
      {isAdmin ? (
        <div className="hidden border-t border-slate-100 bg-white py-2 md:block">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 text-sm text-slate-600">
            <span className="font-semibold text-secondary">Admin:</span>
            {adminNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx('rounded-md px-2 py-1 hover:bg-secondary/10 hover:text-secondary', isActive ? 'bg-secondary/10 text-secondary' : undefined)
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
