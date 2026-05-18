'use client'

import type { ReactNode } from 'react'
import { type UseSwitchContext, useSwitchContext } from './use-switch-context.ts'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => ReactNode
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
