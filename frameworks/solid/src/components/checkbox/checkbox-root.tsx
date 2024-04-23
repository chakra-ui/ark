import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseCheckboxProps, useCheckbox } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

export interface CheckboxRootProps extends Assign<HTMLArkProps<'label'>, UseCheckboxProps> {}

export const CheckboxRoot = (props: CheckboxRootProps) => {
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
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])
  const api = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(() => api().rootProps, labelprops)

  return (
    <CheckboxProvider value={api}>
      <ark.label {...mergedProps} />
    </CheckboxProvider>
  )
}
