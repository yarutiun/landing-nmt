import * as amplitude from '@amplitude/analytics-browser'

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

export const flush = () => amplitude.flush()
