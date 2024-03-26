import { useRadioGroupContext, type UseRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => React.ReactNode
}

export const RadioGroupContext = (props: RadioGroupContextProps) =>
  props.children(useRadioGroupContext())
