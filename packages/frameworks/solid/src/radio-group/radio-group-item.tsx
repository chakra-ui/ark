import type { ItemProps, ItemState } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import { RadioGroupItemProvider } from './radio-group-item-context'

interface ElementProps extends ItemProps {
  children?: ((state: ItemState) => JSX.Element) | JSX.Element
}

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ElementProps> {}

export const RadioGroupItem: ArkComponent<'label', RadioGroupItemProps> = (
  props: RadioGroupItemProps,
) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  const itemState = api().getItemState(itemProps)
  const getChildren = () => runIfFn(localProps.children, itemState)

  return (
    <RadioGroupItemProvider value={itemProps}>
      <ark.label {...mergedProps}>{getChildren()}</ark.label>
    </RadioGroupItemProvider>
  )
}
