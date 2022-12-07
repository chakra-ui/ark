import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<HTMLArkProps<'label'>, UseCheckboxProps>

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
      <ark.label {...checkbox().rootProps} {...labelprops} />
    </CheckboxProvider>
  )
}
