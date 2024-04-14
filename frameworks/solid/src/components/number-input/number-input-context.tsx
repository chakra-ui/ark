import type { JSX } from 'solid-js'
import { type UseNumberInputContext, useNumberInputContext } from './use-number-input-context'

export interface NumberInputContextProps {
  children: (context: UseNumberInputContext) => JSX.Element
}

export const NumberInputContext = (props: NumberInputContextProps) =>
  props.children(useNumberInputContext())
