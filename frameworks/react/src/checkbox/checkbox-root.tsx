import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

export interface CheckboxRootProps extends Assign<HTMLArkProps<'label'>, UseCheckboxProps> {}

export const CheckboxRoot = forwardRef<HTMLLabelElement, CheckboxRootProps>((props, ref) => {
  const [useCheckboxProps, localProps] = createSplitProps<UseCheckboxProps>()(props, [
    'checked',
    'defaultChecked',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'name',
    'onCheckedChange',
    'required',
    'value',
  ])
  const checkbox = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(checkbox.rootProps, localProps)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} ref={ref} />
    </CheckboxProvider>
  )
})

CheckboxRoot.displayName = 'CheckboxRoot'
