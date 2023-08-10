import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<
  ComponentPropsWithoutRef<typeof ark.label>,
  Assign<
    UseCheckboxProps,
    {
      children: ReactNode | ((pages: CheckboxContext) => ReactNode)
    }
  >
>

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const [useCheckboxProps, { children, ...labelProps }] = createSplitProps<UseCheckboxProps>()(
    props,
    [
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
      'onChange',
      'required',
      'value',
    ],
  )
  const checkbox = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(checkbox.rootProps, labelProps)

  const view = runIfFn(children, checkbox)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
    </CheckboxProvider>
  )
})

Checkbox.displayName = 'Checkbox'
