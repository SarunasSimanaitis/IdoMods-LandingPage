import { useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon/Icon'
import { navItems } from '../../data/navigation'
import angleDown from '../../assets/icons/angle-down.svg'
import cubeIcon from '../../assets/icons/cube.svg'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

/**
 * Slide-in navigation for tablet and mobile.
 * Locks page scroll while open, closes on Escape, backdrop click or link click,
 * and moves focus into the panel so keyboard users land in the menu.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.classList.add('is-locked')
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('is-locked')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`} inert={!isOpen}>
      <div className="mobile-menu__backdrop" onClick={onClose} />
      <div
        id="mobile-menu"
        className="mobile-menu__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="circle-btn mobile-menu__close"
          aria-label="Zamknij menu"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <ul className="mobile-menu__list">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    type="button"
                    className="mobile-menu__link"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((cur) => (cur === item.label ? null : item.label))}
                  >
                    {item.label}
                    <Icon src={angleDown} size={20} className="mobile-menu__chevron" />
                  </button>
                  <ul className="mobile-menu__sub" hidden={expanded !== item.label}>
                    {item.submenu.map((sub) => (
                      <li key={sub.label}>
                        <a href={sub.href} onClick={onClose}>
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a className="mobile-menu__link" href={item.href} onClick={onClose}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a className="btn btn--dark mobile-menu__cta" href="#konfigurator" onClick={onClose}>
          <Icon src={cubeIcon} size={20} />
          Stwórz swoją lampę
        </a>
      </div>
    </div>
  )
}
