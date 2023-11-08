import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import { RadioProvider } from './radio-group-item-context'

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const [itemProps, restProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), restProps)

  return (
    <RadioProvider value={itemProps}>
      <ark.label {...mergedProps} />
    </RadioProvider>
  )
}
