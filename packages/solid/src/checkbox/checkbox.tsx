import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { CheckboxProvider, useCheckboxContext, type CheckboxContext } from './checkbox-context'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<CheckboxContextWrapperProps, UseCheckboxProps>

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

  return (
    <CheckboxProvider value={checkbox}>
      <CheckboxContextWrapper {...labelprops} />
    </CheckboxProvider>
  )
}

type CheckboxContextWrapperProps = Assign<
  HTMLArkProps<'label'>,
  {
    children?: JSX.Element | ((context: CheckboxContext) => JSX.Element)
  }
>

const CheckboxContextWrapper = (props: CheckboxContextWrapperProps) => {
  const checkbox = useCheckboxContext()
  const view = children(() => runIfFn(props.children, checkbox))

  return (
    <ark.label {...checkbox().rootProps} {...props}>
      {view()}
    </ark.label>
  )
}
