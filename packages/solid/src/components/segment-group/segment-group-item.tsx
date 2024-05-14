import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { SegmentGroupItemProvider } from './use-segment-group-item-context'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'

export interface SegmentGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
    'invalid',
  ])

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getItemProps(itemProps),
    segmentGroupAnatomy.build().item.attrs,
    localProps,
  )

  const itemState = createMemo(() => segmentGroup().getItemState(itemProps))

  return (
    <SegmentGroupItemPropsProvider value={itemProps}>
      <SegmentGroupItemProvider value={itemState}>
        <ark.label {...mergedProps} />
      </SegmentGroupItemProvider>
    </SegmentGroupItemPropsProvider>
  )
}
