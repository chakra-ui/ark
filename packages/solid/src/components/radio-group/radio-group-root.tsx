import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

export interface RadioGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRadioGroupProps> {}

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  const [useRadioGroupProps, localProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'value',
  ])

  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(() => radioGroup().getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} />
    </RadioGroupProvider>
  )
}
