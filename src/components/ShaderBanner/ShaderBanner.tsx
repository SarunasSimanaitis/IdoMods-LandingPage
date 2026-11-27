import { useEffect, useRef } from 'react'
import { createLightShader } from './lightShader'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './ShaderBanner.css'

/**
 * Dark call-to-action banner with a live WebGL light animation behind static
 * copy (Figma comment 06). The render loop only runs while the banner is on
 * screen; with reduced motion a single still frame is drawn.
 */
export function ShaderBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inView = useInView(sectionRef, '100px')
  const reducedMotion = usePrefersReducedMotion()
  // Animation time survives pausing (scrolling away and back) so it never jumps.
  // Starts a little into the animation so the first frame is already interesting.
  const timeRef = useRef(12)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let created: ReturnType<typeof createLightShader> = null
    try {
      created = createLightShader(canvas)
    } catch {
      created = null
    }
    if (!created) return // CSS gradient fallback stays visible.
    const shader = created
    canvas.classList.add('is-ready')

    // Resizing clears the canvas, so draw again straight away.
    const observer = new ResizeObserver(() => {
      shader.resize()
      shader.render(timeRef.current)
    })
    observer.observe(canvas)

    let frame = 0
    const startTime = timeRef.current
    const start = performance.now()

    if (reducedMotion || !inView) {
      shader.render(startTime)
    } else {
      const loop = (now: number) => {
        timeRef.current = startTime + (now - start) / 1000
        shader.render(timeRef.current)
        frame = requestAnimationFrame(loop)
      }
      frame = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      shader.destroy()
    }
  }, [inView, reducedMotion])

  return (
    <section className="shader-banner" ref={sectionRef} aria-labelledby="shader-banner-title">
      <canvas className="shader-banner__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="shader-banner__content container">
        <h2 className="shader-banner__title" id="shader-banner-title">
          Twoje wnętrze zasługuje na
          <br />
          wyjątkowe światło
        </h2>
        <a className="btn btn--yellow shader-banner__cta" href="#sklep">
          Kup teraz
        </a>
        <p className="shader-banner__note">
          Od 119 zł na oficjalnej stronie
          <br />
          producenta SOLLUX
        </p>
      </div>
    </section>
  )
}
