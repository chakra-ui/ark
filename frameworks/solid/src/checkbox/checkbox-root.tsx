import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCheckbox, type UseCheckboxProps } from './use-checkbox'
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
    'required',
    'value',
  ])
  const api = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(() => api().rootProps, labelprops)

  return (
    <CheckboxProvider value={api}>
      <ark.label {...mergedProps()} />
    </CheckboxProvider>
  )
}
