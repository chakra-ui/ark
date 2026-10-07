'use client'

import type { ReactNode } from 'react'
import { type UseNumberFlowContext, useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowContextProps {
  children: (context: UseNumberFlowContext) => ReactNode
}

export const NumberFlowContext = (props: NumberFlowContextProps) => props.children(useNumberFlowContext())
