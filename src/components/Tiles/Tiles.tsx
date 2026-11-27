import type { ReactNode } from 'react'
import thoroPhoto from '../../assets/tiles/thoro-woman.jpg'
import laptop from '../../assets/tiles/configurator-laptop.webp'
import ipad from '../../assets/tiles/catalog-ipad.webp'
import phoneBack from '../../assets/tiles/smart-phone-back.webp'
import phoneFront from '../../assets/tiles/smart-phone-front.webp'
import './Tiles.css'

type TileArt = {
  src: string
  /** Modifier class that positions this image (see Tiles.css). */
  className: string
}

type Tile = {
  id: string
  eyebrow: string
  title: ReactNode
  cta: string
  href: string
  /** `light` = white text (dark/colour tiles), `dark` = black text. */
  tone: 'light' | 'dark'
  /** `narrow` = 648px column, `wide` = 936px column in the 1600px grid. */
  size: 'narrow' | 'wide'
  art: TileArt[]
}

const rows: Tile[][] = [
  [
    {
      id: 'thoro',
      eyebrow: 'Marka THORO',
      title: 'Poznaj lampy premium',
      cta: 'Odwiedź sklep THORO',
      href: '#thoro',
      tone: 'light',
      size: 'narrow',
      art: [{ src: thoroPhoto, className: 'tile__art--cover' }],
    },
    {
      id: 'configurator',
      eyebrow: 'Konfigurator 3D',
      title: (
        <>
          Wybierz projekt i dostosuj
          <br />
          go do swojego wnętrza
        </>
      ),
      cta: 'Stwórz swój projekt',
      href: '#konfigurator',
      tone: 'light',
      size: 'wide',
      art: [{ src: laptop, className: 'tile__art--laptop' }],
    },
  ],
  [
    {
      id: 'catalog',
      eyebrow: 'Katalog',
      title: 'Odkryj najnowszy katalog',
      cta: 'Sprawdź katalog',
      href: '#katalog',
      tone: 'dark',
      size: 'wide',
      art: [{ src: ipad, className: 'tile__art--ipad' }],
    },
    {
      id: 'smart',
      eyebrow: 'SOLLUX SMART',
      title: 'Przymierz lampę w aplikacji',
      cta: 'Pobierz aplikacje na telefon',
      href: '#sollux-smart',
      tone: 'dark',
      size: 'narrow',
      art: [
        { src: phoneBack, className: 'tile__art--phone-back' },
        { src: phoneFront, className: 'tile__art--phone-front' },
      ],
    },
  ],
]

/**
 * 2×2 promo grid. On hover (Figma comment 05) the artwork zooms to 110 %
 * (500 ms ease-out, clipped by the tile) and the black button turns #4A4A4A.
 * The CTA link is stretched over the whole tile, so the tile is one big link.
 */
export function Tiles() {
  return (
    <div className="tiles">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`tiles__row tiles__row--${rowIndex + 1}`}>
          {row.map((tile) => (
            <article
              key={tile.id}
              className={`tile tile--${tile.id} tile--${tile.size} tile--${tile.tone}`}
            >
              <div className="tile__media" aria-hidden="true">
                {tile.art.map((art) => (
                  <img
                    key={art.className}
                    className={`tile__art ${art.className}`}
                    src={art.src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="tile__text">
                <div className="tile__heading">
                  <p className="tile__eyebrow">{tile.eyebrow}</p>
                  <h2 className="tile__title">{tile.title}</h2>
                </div>
                <a className="btn btn--dark tile__cta" href={tile.href}>
                  {tile.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      ))}
    </div>
  )
}
