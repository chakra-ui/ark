import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<HTMLArkProps<'label'>, UseCheckboxProps>

export const Checkbox = (props: CheckboxProps) => {
  const [useCheckboxProps, labelprops] = splitProps(props, [
    'aria-describedby',
    'aria-invalid',
    'aria-label',
    'aria-labelledby',
    'defaultChecked',
    'defaultValue',
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
      <ark.label {...checkbox().rootProps} {...labelprops} />
    </CheckboxProvider>
  )
}
