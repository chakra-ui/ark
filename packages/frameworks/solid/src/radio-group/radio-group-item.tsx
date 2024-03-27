import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemPropsProvider, RadioGroupItemProvider } from './use-radio-group-item-context'

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <RadioGroupItemProvider value={itemState}>
      <RadioGroupItemPropsProvider value={itemProps}>
        <ark.label {...mergedProps} />
      </RadioGroupItemPropsProvider>
    </RadioGroupItemProvider>
  )
}
