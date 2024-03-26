import { useNumberInputContext, type UseNumberInputContext } from './use-number-input-context'

export interface NumberInputContextProps {
  children: (context: UseNumberInputContext) => React.ReactNode
}

export const NumberInputContext = (props: NumberInputContextProps) =>
  props.children(useNumberInputContext())
