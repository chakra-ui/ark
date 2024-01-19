import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps, type UseCheckboxReturn } from './use-checkbox'

export interface CheckboxRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'label'>,
      {
        children?: ReactNode | ((api: UseCheckboxReturn) => ReactNode)
      }
    >,
    UseCheckboxProps
  > {}

export const CheckboxRoot = forwardRef<HTMLLabelElement, CheckboxRootProps>((props, ref) => {
  const [useCheckboxProps, { children, ...localProps }] = createSplitProps<UseCheckboxProps>()(
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
  const mergedProps = mergeProps(api.rootProps, localProps)
  const view = runIfFn(children, api)

  return (
    <CheckboxProvider value={api}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
    </CheckboxProvider>
  )
})

CheckboxRoot.displayName = 'CheckboxRoot'
