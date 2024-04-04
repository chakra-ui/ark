import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRadioGroup, type UseRadioGroupProps } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

export interface RadioGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRadioGroupProps> {}

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  const [useRadioGroupProps, localProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'value',
  ])

  const api = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <RadioGroupProvider value={api}>
      <ark.div {...mergedProps()} />
    </RadioGroupProvider>
  )
}
