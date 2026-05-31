import * as amplitude from '@amplitude/analytics-browser'
import { Identify } from '@amplitude/analytics-browser'

export const initAmplitude = () => {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || 'AMPLITUDE_KEY_PLACEHOLDER', {
    defaultTracking: true,
  })
}

export const track = (eventName: string, properties?: Record<string, unknown>) => {
  amplitude.track(eventName, properties)
}

export const identifyUser = (userId: string) => {
  amplitude.setUserId(userId)
}

export const setUserProperties = (properties: Record<string, string | number | boolean>) => {
  const identifyEvent = new Identify()
  Object.entries(properties).forEach(([key, value]) => {
    identifyEvent.set(key, value)
  })
  amplitude.identify(identifyEvent)
}

export const flush = () => amplitude.flush()
