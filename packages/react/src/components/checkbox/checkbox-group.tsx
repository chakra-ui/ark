import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { checkboxAnatomy } from './checkbox.anatomy'
import { type UseCheckboxGroupProps, useCheckboxGroup } from './use-checkbox-group'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context'

export interface CheckboxGroupBaseProps extends UseCheckboxGroupProps, PolymorphicProps {}
export interface CheckboxGroupProps extends Assign<HTMLProps<'div'>, CheckboxGroupBaseProps> {}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  const [checkboxGroupProps, localProps] = createSplitProps<UseCheckboxGroupProps>()(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'invalid',
    'readOnly',
    'name',
  ])

  const checkboxGroup = useCheckboxGroup(checkboxGroupProps)

  return (
    <CheckboxGroupContextProvider value={checkboxGroup}>
      <ark.div ref={ref} role="group" {...localProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
})

CheckboxGroup.displayName = 'CheckboxGroup'
