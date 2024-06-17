import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseCheckboxProps, useCheckbox } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

export interface CheckboxRootBaseProps extends UseCheckboxProps, PolymorphicProps<'label'> {}
export interface CheckboxRootProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    CheckboxRootBaseProps {}

export const CheckboxRoot = (props: CheckboxRootProps) => {
  const [useCheckboxProps, labelprops] = createSplitProps<UseCheckboxProps>()(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])
  const checkbox = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(() => checkbox().getRootProps(), labelprops)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} />
    </CheckboxProvider>
  )
}
