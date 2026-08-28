'use client'

import type { StepAction } from '@zag-js/tour'
import type { ReactNode } from 'react'
import { useTourContext } from './use-tour-context.ts'

export interface TourActionsProps {
  children: (actions: StepAction[]) => ReactNode
}

export const TourActions = (props: TourActionsProps) => props.children(useTourContext().step?.actions ?? [])
