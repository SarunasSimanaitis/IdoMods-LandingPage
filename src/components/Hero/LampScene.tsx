import { useEffect, useRef, useState, type CSSProperties } from 'react'
import backdrop from '../../assets/hero/slide-1-backdrop.jpg'
import rock from '../../assets/hero/rock.png'
import lampBeige from '../../assets/hero/lamp-beige.png'
import lampOlive from '../../assets/hero/lamp-olive.png'
import lampTerracotta from '../../assets/hero/lamp-terracotta.png'

/**
 * Slide 1 of the hero, rebuilt from layers so the lamps can move (Figma comment 03).
 *
 * Every layer is positioned on a 1920×1080 "stage" (the Figma frame size) using
 * percentages, so the composition is identical to the flat design at rest.
 * - Pointer movement shifts each layer by a different amount (parallax depth).
 * - Clicking a lamp switches it on: a warm glow fades in from its diffuser.
 */

type Lamp = {
  id: string
  label: string
  src: string
  /** Box on the 1920×1080 stage, in px. */
  x: number
  y: number
  width: number
  height: number
  /** Centre of the light diffuser, as a fraction of the lamp image. */
  faceX: number
  faceY: number
  /** How strongly the lamp follows the pointer. */
  depth: number
}

const STAGE_W = 1920
const STAGE_H = 1080

const lamps: Lamp[] = [
  { id: 'terracotta', label: 'terakotowa', src: lampTerracotta, x: 435, y: 440, width: 398, height: 377, faceX: 0.6, faceY: 0.67, depth: 26 },
  { id: 'beige', label: 'beżowa', src: lampBeige, x: 772, y: 113, width: 356, height: 368, faceX: 0.6, faceY: 0.64, depth: 16 },
  { id: 'olive', label: 'oliwkowa', src: lampOlive, x: 1083, y: 337, width: 437, height: 412, faceX: 0.19, faceY: 0.83, depth: 34 },
]

const ROCK = { x: 296, y: 791, width: 1360, height: 289, depth: -8 }

/** Converts stage pixels to percentages of the stage. */
const box = (x: number, y: number, width: number, height: number): CSSProperties => ({
  left: `${(x / STAGE_W) * 100}%`,
  top: `${(y / STAGE_H) * 100}%`,
  width: `${(width / STAGE_W) * 100}%`,
  height: `${(height / STAGE_H) * 100}%`,
})

type LampSceneProps = {
  /** Parallax only runs while the slide is visible. */
  isActive: boolean
}

export function LampScene({ isActive }: LampSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [litLamps, setLitLamps] = useState<Record<string, boolean>>({})

  // Pointer parallax: ease the current position towards the pointer every frame,
  // and expose it as CSS variables (--px, --py in the range -1..1).
  useEffect(() => {
    const stage = stageRef.current
    const hero = stage?.closest('section')
    if (!stage || !hero || !isActive) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = hero.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
    }
    const onPointerLeave = () => {
      target.x = 0
      target.y = 0
    }
    const tick = () => {
      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      stage.style.setProperty('--px', current.x.toFixed(4))
      stage.style.setProperty('--py', current.y.toFixed(4))
      frame = requestAnimationFrame(tick)
    }

    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', onPointerLeave)
    frame = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(frame)
    }
  }, [isActive])

  const toggleLamp = (id: string) => setLitLamps((lit) => ({ ...lit, [id]: !lit[id] }))
  const litCount = Object.values(litLamps).filter(Boolean).length

  return (
    <div className="lamp-scene" ref={stageRef}>
      <img className="lamp-scene__backdrop" src={backdrop} alt="" />

      {/* Warm ambient wash that grows with the number of lamps switched on. */}
      <div className="lamp-scene__ambient" style={{ opacity: litCount / lamps.length }} />

      <div
        className="lamp-scene__layer"
        style={{ ...box(ROCK.x, ROCK.y, ROCK.width, ROCK.height), '--depth': ROCK.depth } as CSSProperties}
      >
        <img src={rock} alt="" />
      </div>

      {lamps.map((lamp, index) => {
        const isOn = Boolean(litLamps[lamp.id])
        return (
          <div
            key={lamp.id}
            className={`lamp-scene__layer lamp ${isOn ? 'is-on' : ''}`}
            style={
              {
                ...box(lamp.x, lamp.y, lamp.width, lamp.height),
                '--depth': lamp.depth,
                '--face-x': `${lamp.faceX * 100}%`,
                '--face-y': `${lamp.faceY * 100}%`,
                '--float-delay': `${index * -2.1}s`,
              } as CSSProperties
            }
          >
            <span className="lamp__glow" aria-hidden="true" />
            <button
              type="button"
              className="lamp__button"
              aria-pressed={isOn}
              aria-label={`${isOn ? 'Wyłącz' : 'Włącz'} lampę ${lamp.label}`}
              title={isOn ? 'Kliknij, aby wyłączyć' : 'Kliknij, aby włączyć'}
              onClick={() => toggleLamp(lamp.id)}
            >
              <img src={lamp.src} alt="" draggable={false} />
              <span className="lamp__bulb" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
