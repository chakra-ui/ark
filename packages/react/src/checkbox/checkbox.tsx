import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

export type CheckboxProps = Assign<HTMLAtlasProps<'label'>, UseCheckboxProps>

export const Checkbox = forwardRef<'label', CheckboxProps>((props, ref) => {
  const [useCheckboxProps, labelprops] = splitProps(props, [
    'aria-describedby',
    'aria-invalid',
    'aria-label',
    'aria-labelledby',
    'defaultChecked',
    'dir',
    'defaultValue',
    'disabled',
    'focusable',
    'getRootNode',
    'ids',
    'indeterminate',
    'invalid',
    'name',
    'onChange',
    'readonly',
    'required',
    'value',
  ])
  const checkbox = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(checkbox.rootProps, labelprops)

  return (
    <CheckboxProvider value={checkbox}>
      <atlas.label {...mergedProps} ref={ref} />
    </CheckboxProvider>
  )
})
