import { useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon/Icon'
import { navItems } from '../../data/navigation'
import { MobileMenu } from './MobileMenu'
import logo from '../../assets/brand/logo-sollux-white.svg'
import angleDown from '../../assets/icons/angle-down.svg'
import searchIcon from '../../assets/icons/search.svg'
import cubeIcon from '../../assets/icons/cube.svg'
import userIcon from '../../assets/icons/user.svg'
import basketIcon from '../../assets/icons/basket.svg'
import './Header.css'

/**
 * Fixed site header.
 * - Transparent over the hero, white on hover/focus (Figma comment 02, 250 ms).
 * - Also turns white once the page is scrolled, so it stays readable on white sections.
 * - Desktop: links with dropdowns. Below 1280px: burger + slide-in menu.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close an open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openSubmenu) return
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenSubmenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenSubmenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openSubmenu])

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  const isSolid = isScrolled || isMenuOpen || isSearchOpen || openSubmenu !== null

  return (
    <header className={`header ${isSolid ? 'header--solid' : ''}`}>
      <div className="header__inner container">
        <a className="header__logo" href="#top" aria-label="SOLLUX – strona główna">
          <Icon src={logo} width={150} height={48} />
        </a>

        <nav className="header__nav" aria-label="Główna nawigacja">
          <ul className="header__links" ref={navRef}>
            {navItems.map((item) =>
              item.submenu ? (
                <li
                  key={item.label}
                  className={`header__item ${openSubmenu === item.label ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpenSubmenu(item.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <button
                    type="button"
                    className="header__link"
                    aria-expanded={openSubmenu === item.label}
                    onClick={() =>
                      setOpenSubmenu((current) => (current === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                    <Icon src={angleDown} size={16} className="header__chevron" />
                  </button>
                  <ul className="header__dropdown">
                    {item.submenu.map((sub) => (
                      <li key={sub.label}>
                        <a href={sub.href} onClick={() => setOpenSubmenu(null)}>
                          {sub.swatch && (
                            <span className="header__swatch" style={{ background: sub.swatch }} />
                          )}
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label} className="header__item">
                  <a className="header__link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <form
          className={`header__search ${isSearchOpen ? 'is-open' : ''}`}
          role="search"
          action="#"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="site-search">
            Czego szukasz?
          </label>
          <input
            ref={searchInputRef}
            id="site-search"
            type="search"
            name="q"
            placeholder="Czego szukasz?"
            autoComplete="off"
          />
          <button type="submit" className="header__search-submit" aria-label="Szukaj">
            <Icon src={searchIcon} size={20} />
          </button>
        </form>

        <div className="header__actions">
          <a className="header__configurator" href="#konfigurator">
            <Icon src={cubeIcon} size={20} />
            <span>Stwórz swoją lampę</span>
          </a>
          <button
            type="button"
            className="circle-btn header__icon-btn header__search-toggle"
            aria-label={isSearchOpen ? 'Zamknij wyszukiwarkę' : 'Otwórz wyszukiwarkę'}
            aria-expanded={isSearchOpen}
            onClick={() => setIsSearchOpen((open) => !open)}
          >
            <Icon src={searchIcon} size={20} />
          </button>
          <a className="circle-btn header__icon-btn" href="#konto" aria-label="Moje konto">
            <Icon src={userIcon} />
          </a>
          <a className="circle-btn header__icon-btn" href="#koszyk" aria-label="Koszyk">
            <Icon src={basketIcon} width={22} height={19} />
          </a>
          <button
            type="button"
            className="circle-btn header__icon-btn header__burger"
            aria-label="Otwórz menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="header__burger-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
