import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
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
  ])
  const api = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(() => api().rootProps, labelprops)
  const getChildren = () => runIfFn(props.children, api)

  return (
    <CheckboxProvider value={api}>
      <ark.label {...mergedProps}>{getChildren()}</ark.label>
      <input {...api().hiddenInputProps} />
    </CheckboxProvider>
  )
}
