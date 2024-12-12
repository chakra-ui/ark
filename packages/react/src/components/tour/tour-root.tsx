import type { ReactNode } from 'react'
import { type UseTourProps, useTour } from './use-tour'
import { TourProvider } from './use-tour-context'

export interface TourRootBaseProps extends UseTourProps {}
export interface TourRootProps extends TourRootBaseProps {
  children?: ReactNode
}

export const TourRoot = (props: TourRootProps) => {
  const { children, ...useTourProps } = props
  const tour = useTour(useTourProps)

  return <TourProvider value={tour}>{children}</TourProvider>
}
