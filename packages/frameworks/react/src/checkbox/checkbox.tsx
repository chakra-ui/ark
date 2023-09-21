import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export interface CheckboxProps
  extends Assign<
    HTMLArkProps<'label'>,
    Assign<
      UseCheckboxProps,
      {
        children?: ReactNode | ((pages: CheckboxContext) => ReactNode)
      }
    >
  > {}

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
      'onCheckedChange',
      'required',
      'value',
    ],
  )
  const api = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(api.rootProps, labelProps)

  const view = runIfFn(children, api)

  return (
    <CheckboxProvider value={api}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
      <input {...api.hiddenInputProps} />
    </CheckboxProvider>
  )
})

Checkbox.displayName = 'Checkbox'
