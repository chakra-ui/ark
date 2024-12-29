import type { StepAction } from '@zag-js/tour'
import type { JSX } from 'solid-js'

import { useTourContext } from './use-tour-context'

export interface TourActionsProps {
  children: (actions: StepAction[]) => JSX.Element
}

export const TourActions = (props: TourActionsProps) =>
  props.children(useTourContext()().step?.actions ?? [])
