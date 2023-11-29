import type { ItemProps, ItemState } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import { RadioGroupItemProvider } from './radio-group-item-context'

export interface RadioGroupItemProps
  extends Assign<
      HTMLArkProps<'label'>,
      { children?: ((state: ItemState) => ReactNode) | ReactNode }
    >,
    ItemProps {}

export const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <RadioGroupItemProvider value={itemProps}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
    </RadioGroupItemProvider>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
