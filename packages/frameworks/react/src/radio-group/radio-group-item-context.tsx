import {
  useRadioGroupItemContext,
  type UseRadioGroupItemContext,
} from './use-radio-group-item-context'

export interface RadioGroupItemContextProps {
  children: (context: UseRadioGroupItemContext) => React.ReactNode
}

export const RadioGroupItemContext = (props: RadioGroupItemContextProps) =>
  props.children(useRadioGroupItemContext())
