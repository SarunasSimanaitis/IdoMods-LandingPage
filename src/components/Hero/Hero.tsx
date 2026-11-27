import { useCallback, useRef, useState } from 'react'
import { LampScene } from './LampScene'
import { useInView } from '../../hooks/useInView'
import { usePageVisible } from '../../hooks/usePageVisible'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import interior from '../../assets/hero/slide-2-interior.jpg'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'
import star from '../../assets/icons/star.svg'
import './Hero.css'

/** Autoplay delay from Figma comment 04. Also drives the progress bar fill. */
const SLIDE_DURATION_MS = 3000

const slides = [
  { id: 'lamps', label: 'Lampy SOLLUX na tle zachodu słońca' },
  { id: 'interior', label: 'Przedpokój z lampami SOLLUX' },
]

/**
 * Hero slider (Figma comment 04):
 * - autoplay every 3 s, 600 ms crossfade, image settles from scale 1.05 to 1;
 * - the yellow progress bar fills linearly over 3 s and the end of that CSS
 *   animation is what advances the slide, so bar and slide never drift apart;
 * - pauses when the tab is hidden, the hero is off-screen, or reduced motion is on.
 */
export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const inView = useInView(heroRef)
  const pageVisible = usePageVisible()
  const reducedMotion = usePrefersReducedMotion()

  const isPlaying = inView && pageVisible && !reducedMotion

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }, [])

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      aria-roledescription="karuzela"
      aria-label="Bestsellery SOLLUX"
    >
      <div className="hero__slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === activeIndex ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slajd"
            aria-label={`${index + 1} z ${slides.length}: ${slide.label}`}
            aria-hidden={index !== activeIndex}
            inert={index !== activeIndex}
          >
            <div className="hero__media">
              {slide.id === 'lamps' ? (
                <LampScene isActive={index === activeIndex} />
              ) : (
                <img className="hero__image" src={interior} alt="" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hero__content container">
        <div className="hero__copy">
          <p className="hero__eyebrow">Bestsellery SOLLUX</p>
          <h1 className="hero__title">
            Kolor i forma
            <br />
            w nowym świetle
          </h1>
        </div>
        <a className="btn btn--yellow hero__cta" href="#bestsellery">
          Sprawdź bestsellery
        </a>
      </div>

      <button
        type="button"
        className="circle-btn hero__arrow hero__arrow--prev"
        aria-label="Poprzedni slajd"
        onClick={() => goTo(activeIndex - 1)}
      >
        <img src={arrowLeft} alt="" width={24} height={24} />
      </button>
      <button
        type="button"
        className="circle-btn hero__arrow hero__arrow--next"
        aria-label="Następny slajd"
        onClick={() => goTo(activeIndex + 1)}
      >
        <img src={arrowRight} alt="" width={24} height={24} />
      </button>

      <div className="hero__progress">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero__progress-step ${index === activeIndex ? 'is-active' : ''}`}
            aria-label={`Pokaż slajd ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
          >
            {index === activeIndex && (
              <span
                // A new key restarts the fill animation whenever the slide changes.
                key={`fill-${activeIndex}`}
                className={`hero__progress-fill ${isPlaying ? '' : 'is-paused'} ${
                  reducedMotion ? 'is-static' : ''
                }`}
                style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                onAnimationEnd={() => goTo(activeIndex + 1)}
              />
            )}
          </button>
        ))}
      </div>

      <a className="hero__rating" href="#opinie" aria-label="Ocena 4.8 – uwielbiany przez klientów">
        <span className="hero__rating-score">
          4.8
          <img src={star} alt="" width={14} height={17} />
        </span>
        <span className="hero__rating-text">Uwielbiany przez klientów</span>
      </a>
    </section>
  )
}
