import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => radioGroup().getItemState(itemProps))

  return (
    <RadioGroupItemPropsProvider value={itemProps}>
      <RadioGroupItemProvider value={itemState}>
        <ark.label {...mergedProps} />
      </RadioGroupItemProvider>
    </RadioGroupItemPropsProvider>
  )
}
