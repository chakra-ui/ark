'use client'

import type { ReactNode } from 'react'
import { type UseToggleGroupContext, useToggleGroupContext } from './use-toggle-group-context.ts'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => ReactNode
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) => props.children(useToggleGroupContext())
