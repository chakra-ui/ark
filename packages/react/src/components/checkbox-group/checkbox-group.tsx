import { createSplitProps } from '../../utils/create-split-props'
import { type UseCheckboxGroupProps, useCheckboxGroup } from './use-checkbox-group'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context'

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
  children: React.ReactNode
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const [groupProps, restProps] = createSplitProps<UseCheckboxGroupProps>()(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'readOnly',
  ])

  const group = useCheckboxGroup(groupProps)

  return <CheckboxGroupContextProvider value={group} {...restProps} />
}
