import { ValueProps } from '../ValueProps/ValueProps'
import { Tiles } from '../Tiles/Tiles'
import './Showcase.css'

/** White section under the hero ("VP's" frame in Figma): benefits + promo tiles. */
export function Showcase() {
  return (
    <section className="showcase" aria-label="Oferta SOLLUX">
      <div className="showcase__inner container">
        <ValueProps />
        <Tiles />
      </div>
    </section>
  )
}
