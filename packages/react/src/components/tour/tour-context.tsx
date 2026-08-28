'use client'

import type { ReactNode } from 'react'
import { type UseTourContext, useTourContext } from './use-tour-context.ts'

export interface TourContextProps {
  children: (context: UseTourContext) => ReactNode
}

export const TourContext = (props: TourContextProps) => props.children(useTourContext())
