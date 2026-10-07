import type { JSX } from 'solid-js'
import { type UseNumberFlowContext, useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowContextProps {
  children: (context: UseNumberFlowContext) => JSX.Element
}

export const NumberFlowContext = (props: NumberFlowContextProps) => props.children(useNumberFlowContext())
