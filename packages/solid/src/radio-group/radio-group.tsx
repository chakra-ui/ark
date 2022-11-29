import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { RadioGroupProvider } from './radio-group-context'
import { useRadioGroup, UseRadioGroupProps } from './use-radio-group'

export type RadioGroupProps = Assign<HTMLArkProps<'div'>, UseRadioGroupProps>

export const RadioGroup = (props: RadioGroupProps) => {
  const [useRadioGroupProps, divProps] = createSplitProps<UseRadioGroupProps>()(props, [
    'defaultValue',
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
  const radioGroup = useRadioGroup(useRadioGroupProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...radioGroup().rootProps} {...divProps} />
    </RadioGroupProvider>
  )
}
