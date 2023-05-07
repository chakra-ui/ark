import { mergeProps } from '@zag-js/solid'
import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { CheckboxProvider, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<
  HTMLArkProps<'label'>,
  UseCheckboxProps & {
    children?: JSX.Element | ((context: CheckboxContext) => JSX.Element)
  }
>

export const Checkbox = (props: CheckboxProps) => {
  const [useCheckboxProps, labelprops] = createSplitProps<UseCheckboxProps>()(props, [
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
  ])
  const checkbox = useCheckbox(useCheckboxProps)
  const rootProps = mergeProps(() => checkbox().rootProps, labelprops)

  const getChildren = children(() => runIfFn(props.children, checkbox))

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...rootProps}>{getChildren()}</ark.label>
    </CheckboxProvider>
  )
}
