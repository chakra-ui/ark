import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<
  Omit<HTMLArkProps<'label'>, 'children'> & {
    children: ReactNode | ((pages: CheckboxContext) => ReactNode)
  },
  UseCheckboxProps
>

export const Checkbox = forwardRef<'label', CheckboxProps>((props, ref) => {
  const [useCheckboxProps, { children, ...labelProps }] = createSplitProps<UseCheckboxProps>()(
    props,
    [
      'aria-describedby',
      'aria-label',
      'aria-labelledby',
      'checked',
      'dir',
      'disabled',
      'focusable',
      'form',
      'getRootNode',
      'id',
      'ids',
      'indeterminate',
      'invalid',
      'name',
      'onChange',
      'readOnly',
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
