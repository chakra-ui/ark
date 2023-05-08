import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, type UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Assign<HTMLArkProps<'div'>, UseRadioGroupProps>

export const RadioGroup = (props: RadioGroupProps) => {
  const [groupParams, restProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'name',
    'onChange',
    'orientation',
    'readOnly',
    'value',
  ])

  const api = useRadioGroup(groupParams)
  const rootProps = mergeProps(() => api().rootProps, restProps)

  return (
    <RadioGroupProvider value={api}>
      <ark.div {...rootProps} />
    </RadioGroupProvider>
  )
}
