import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemState } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSegmentGroupContext } from './segment-group-context'
import {
  SegmentGroupItemProvider,
  type SegmentGroupItemContext,
} from './segment-group-item-context'

interface ElementProps extends SegmentGroupItemContext {
  children?: JSX.Element | ((state: ItemState) => JSX.Element)
}

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ElementProps> {}

export const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<SegmentGroupItemContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])

  const api = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => api().getItemProps(itemProps),
    segmentGroupAnatomy.build().item.attrs,
    localProps,
  )

  const itemState = api().getItemState(itemProps)
  const getChildren = () => runIfFn(localProps.children, itemState)

  return (
    <SegmentGroupItemProvider value={itemProps}>
      <ark.label {...mergedProps}>{getChildren()}</ark.label>
    </SegmentGroupItemProvider>
  )
}
