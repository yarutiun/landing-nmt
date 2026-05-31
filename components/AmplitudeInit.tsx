'use client'

import { useEffect } from 'react'
import { initAmplitude } from '@/lib/amplitude'
import { usePageTracking } from '@/lib/useAmplitude'

export default function AmplitudeInit() {
  useEffect(() => {
    initAmplitude()
  }, [])

  usePageTracking()

  return null
}
