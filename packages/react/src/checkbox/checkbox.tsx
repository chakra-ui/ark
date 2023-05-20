import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<HTMLArkProps<'label'>, Foo>

type Foo = Assign<
  UseCheckboxProps,
  {
    children: ReactNode | ((pages: CheckboxContext) => ReactNode)
  }
>

export const Checkbox = forwardRef<'label', Foo>((props, ref) => {
  const [useCheckboxProps, { children, ...labelProps }] = createSplitProps<UseCheckboxProps>()(
    props,
    [
      'checked',
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
