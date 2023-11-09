import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, type UseRadioGroupProps } from './use-radio-group'

export interface RadioGroupProps extends Assign<HTMLArkProps<'div'>, UseRadioGroupProps> {}

export const RadioGroup = (props: RadioGroupProps) => {
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
      <ark.div {...mergedProps} />
    </RadioGroupProvider>
  )
}
