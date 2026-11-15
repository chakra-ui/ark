import type { JSX } from '@solidjs/web'

import { type UseTourContext, useTourContext } from './use-tour-context.ts'

export interface TourContextProps {
  children: (context: UseTourContext) => JSX.Element
}

export const TourContext = (props: TourContextProps) => props.children(useTourContext())
