import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number | number[]
}

const defaultOpts: IntersectionObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
}

function useObserver(options: IntersectionObserverOptions = defaultOpts): [React.MutableRefObject<any>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<any>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [observerRef, options])

  return [observerRef, isVisible]
}

export default useObserver
