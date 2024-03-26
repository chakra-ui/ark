import type { ReactNode } from 'react'
import { useNumberInputContext, type UseNumberInputContext } from './use-number-input-context'

export interface NumberInputContextProps {
  children: (context: UseNumberInputContext) => ReactNode
}

export const NumberInputContext = (props: NumberInputContextProps) =>
  props.children(useNumberInputContext())
