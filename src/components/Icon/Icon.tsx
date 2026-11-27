import type { CSSProperties } from 'react'

type IconProps = {
  /** URL of an exported single-colour SVG. */
  src: string
  /** Square size in px; use width/height for non-square icons. */
  size?: number
  width?: number
  height?: number
  className?: string
}

/**
 * Renders an SVG as a CSS mask filled with `currentColor` (see `.icon` in base.css).
 * Decorative by default: the surrounding button/link provides the accessible name.
 */
export function Icon({ src, size = 24, width, height, className = '' }: IconProps) {
  const style = {
    '--icon': `url("${src}")`,
    '--icon-w': `${width ?? size}px`,
    '--icon-h': `${height ?? size}px`,
  } as CSSProperties

  return <span className={`icon ${className}`} style={style} aria-hidden="true" />
}
