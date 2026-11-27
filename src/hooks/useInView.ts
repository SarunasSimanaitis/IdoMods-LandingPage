import { useEffect, useState, type RefObject } from 'react'

/**
 * True while the element is (at least partly) on screen.
 * Lets the slider and the WebGL shader pause when nobody can see them.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px') {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
