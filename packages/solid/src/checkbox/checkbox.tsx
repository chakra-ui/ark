import type { Assign } from '@polymorphic-factory/solid'
import { children, JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { CheckboxContext, CheckboxProvider, useCheckboxContext } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<CheckboxContextWrapperProps, UseCheckboxProps>

export const Checkbox = (props: CheckboxProps) => {
  const [useCheckboxProps, labelprops] = createSplitProps<UseCheckboxProps>()(props, [
    'aria-describedby',
    'aria-label',
    'aria-labelledby',
    'defaultChecked',
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
    children: JSX.Element | ((context: CheckboxContext) => JSX.Element)
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
