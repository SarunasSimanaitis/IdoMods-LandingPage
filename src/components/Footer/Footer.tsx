import { Icon } from '../Icon/Icon'
import { awards, linkColumns, paymentLogos, socialLinks, stores } from '../../data/footer'
import logo from '../../assets/brand/logo-sollux-dark.svg'
import badgeIdoMods from '../../assets/brand/badge-idomods.svg'
import badgeIdoSell from '../../assets/brand/badge-idosell.svg'
import './Footer.css'

/** Site footer: links, payments/awards/stores and the legal caption. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <a href="#top" aria-label="SOLLUX – wróć na górę strony">
            <img src={logo} alt="SOLLUX" width={160} height={44} />
          </a>
          <ul className="footer__socials">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  className="circle-btn footer__social"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <Icon src={social.icon} width={social.width ?? 24} height={social.height ?? 24} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__columns" aria-label="Linki w stopce">
          {linkColumns.map((column) => (
            <div key={column.title} className="footer__column">
              <h2 className="footer__heading">{column.title}</h2>
              <ul className="footer__links">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <a className="footer__link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <div className="footer__panel">
            <h2 className="footer__heading">Płatności i dostawy</h2>
            <ul className="footer__payments">
              {paymentLogos.map((logoItem) => (
                <li key={logoItem.name} className="footer__payment">
                  <img src={logoItem.src} alt={logoItem.name} width={43} height={24} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__panel">
            <h2 className="footer__heading">Nagrody</h2>
            <ul className="footer__awards">
              {awards.map((award) => (
                <li key={award.name}>
                  <img
                    src={award.src}
                    alt={award.name}
                    width={award.width}
                    height={award.height}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__panel">
            <h2 className="footer__heading">Nasze sklepy</h2>
            <ul className="footer__flags">
              {stores.map((store) => (
                <li key={store.country}>
                  <a className="footer__flag" href="#" aria-label={`Sklep SOLLUX – ${store.country}`}>
                    <img src={store.flag} alt="" width={24} height={24} loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__caption container">
        <div className="footer__vat">
          <p>W sklepie prezentujemy ceny brutto (z VAT). Stawki VAT dla konsumentów z kraju: Polska.</p>
          <span className="footer__divider" aria-hidden="true" />
          <div className="footer__badges">
            <img src={badgeIdoMods} alt="Design & Code: IdoMods" width={98} height={36} />
            <img src={badgeIdoSell} alt="Powered by IdoSell" width={66} height={36} />
          </div>
        </div>
        <address className="footer__contact">
          <span>NIP: 6070082443</span>
          <span className="footer__phone">
            <a className="footer__link" href="tel:+48668806323">
              +48 668 806 323
            </a>
            <span>(Pn - Pt 7:00 - 15:00)</span>
          </span>
          <a className="footer__link" href="mailto:sklep@sollux.pl">
            sklep@sollux.pl
          </a>
          <span>Sollux Lighting Sp. z o.o.</span>
          <span>Władysława Łokietka 35, 64-840 Budzyń (POLSKA)</span>
        </address>
      </div>
    </footer>
  )
}
