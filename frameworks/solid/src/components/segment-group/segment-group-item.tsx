import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useSegmentGroupContext } from './use-segment-group-context'
import {
  SegmentGroupItemPropsProvider,
  SegmentGroupItemProvider,
} from './use-segment-group-item-context'

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
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

  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <SegmentGroupItemPropsProvider value={itemProps}>
      <SegmentGroupItemProvider value={itemState}>
        <ark.label {...mergedProps} />
      </SegmentGroupItemProvider>
    </SegmentGroupItemPropsProvider>
  )
}
