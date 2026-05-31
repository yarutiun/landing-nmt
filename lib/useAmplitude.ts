'use client'

import { useEffect, useRef } from 'react'
import { track } from './amplitude'

type Section = 'hero' | 'demo' | 'features' | 'ai' | 'waitlist'

export function useSectionTracking(sectionId: string, sectionName: Section) {
  const ref = useRef<HTMLElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true
            track('section_viewed', { section: sectionName })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [sectionName])

  return ref
}

export function usePageTracking() {
  const tracked = useRef(false)

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true
      track('page_viewed')
    }
  }, [])
}
