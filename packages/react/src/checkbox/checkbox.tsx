import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { checkboxSplitProps } from './checkbox-split-props'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<
  Omit<HTMLArkProps<'label'>, 'children'> & {
    children: ReactNode | ((pages: CheckboxContext) => ReactNode)
  },
  UseCheckboxProps
>

export const Checkbox = forwardRef<'label', CheckboxProps>((props, ref) => {
  const [useCheckboxProps, { children, ...labelProps }] = checkboxSplitProps(props)

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
