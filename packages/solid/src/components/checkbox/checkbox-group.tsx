import { checkboxAnatomy } from '@ark-ui/anatomy'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseCheckboxGroupProps, useCheckboxGroup } from './use-checkbox-group'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context'

export interface CheckboxGroupProps extends Assign<HTMLArkProps<'div'>, UseCheckboxGroupProps> {}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const [checkboxGroupProps, localProps] = createSplitProps<UseCheckboxGroupProps>()(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'readOnly',
  ])
  const checkboxGroup = useCheckboxGroup(checkboxGroupProps)

  return (
    <CheckboxGroupContextProvider value={checkboxGroup}>
      <ark.div role="group" {...localProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
}
