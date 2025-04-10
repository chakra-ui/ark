import type { JSX } from 'solid-js'

import { type UseTourContext, useTourContext } from './use-tour-context'

export interface TourContextProps {
  children: (context: UseTourContext) => JSX.Element
}

export const TourContext = (props: TourContextProps) => props.children(useTourContext())
