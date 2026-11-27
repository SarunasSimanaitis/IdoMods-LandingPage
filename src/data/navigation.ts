/**
 * Main navigation. Labels come from the Figma navbar.
 * The three items with a chevron in Figma get a dropdown; its entries are not
 * in the design, so they are kept short and generic (see README).
 */
export type NavItem = {
  label: string
  href: string
  submenu?: { label: string; href: string; swatch?: string }[]
}

export const navItems: NavItem[] = [
  {
    label: 'Lampy',
    href: '#lampy',
    submenu: [
      { label: 'Lampy wiszące', href: '#lampy-wiszace' },
      { label: 'Lampy sufitowe', href: '#lampy-sufitowe' },
      { label: 'Kinkiety', href: '#kinkiety' },
      { label: 'Lampy podłogowe', href: '#lampy-podlogowe' },
      { label: 'Lampy stołowe', href: '#lampy-stolowe' },
      { label: 'Reflektory', href: '#reflektory' },
    ],
  },
  {
    label: 'Kolory',
    href: '#kolory',
    // Swatch colours are the ones used in the Figma 3D configurator tile.
    submenu: [
      { label: 'Beżowy', href: '#kolor-bezowy', swatch: '#f5f5dc' },
      { label: 'Oliwkowy', href: '#kolor-oliwkowy', swatch: '#56663e' },
      { label: 'Zielony', href: '#kolor-zielony', swatch: '#708238' },
      { label: 'Granatowy', href: '#kolor-granatowy', swatch: '#3f4f8b' },
      { label: 'Kobaltowy', href: '#kolor-kobaltowy', swatch: '#0e2a94' },
      { label: 'Taupe', href: '#kolor-taupe', swatch: '#beada3' },
      { label: 'Brązowy', href: '#kolor-brazowy', swatch: '#837060' },
    ],
  },
  {
    label: 'Pomieszczenia',
    href: '#pomieszczenia',
    submenu: [
      { label: 'Salon', href: '#salon' },
      { label: 'Sypialnia', href: '#sypialnia' },
      { label: 'Kuchnia', href: '#kuchnia' },
      { label: 'Łazienka', href: '#lazienka' },
      { label: 'Przedpokój', href: '#przedpokoj' },
      { label: 'Biuro', href: '#biuro' },
    ],
  },
  { label: 'Nowości', href: '#nowosci' },
  { label: 'Bestsellery', href: '#bestsellery' },
  { label: 'Promocje', href: '#promocje' },
]
