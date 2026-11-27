import { Icon } from '../Icon/Icon'
import returnIcon from '../../assets/icons/vp-return.svg'
import bookmarkIcon from '../../assets/icons/vp-bookmark.svg'
import truckIcon from '../../assets/icons/vp-truck.svg'
import polishIcon from '../../assets/icons/vp-polish-products.svg'
import trophyIcon from '../../assets/icons/vp-trophy.svg'
import './ValueProps.css'

const values = [
  { icon: returnIcon, title: 'Zwroty nawet do 100 dni', text: 'szybkie i proste' },
  { icon: bookmarkIcon, title: '5 lat gwarancji', text: 'na wszystkie produkty' },
  { icon: truckIcon, title: 'Darmowa dostawa', text: 'już za 299 zł' },
  { icon: polishIcon, title: 'Polskie produkty', text: 'sprawdzona jakość' },
  { icon: trophyIcon, title: 'Oficjalny sklep producenta', text: 'gwarancja satysfakcji' },
]

/** Row of five store benefits ("TOP VP" in Figma). */
export function ValueProps() {
  return (
    <ul className="value-props" aria-label="Dlaczego SOLLUX">
      {values.map((value) => (
        <li key={value.title} className="value-props__item">
          <Icon src={value.icon} size={32} />
          <div className="value-props__copy">
            <h2 className="value-props__title">{value.title}</h2>
            <p className="value-props__text">{value.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
