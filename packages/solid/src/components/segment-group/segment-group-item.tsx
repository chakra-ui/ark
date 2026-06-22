import type { ItemProps } from '@zag-js/radio-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { SegmentGroupItemProvider } from './use-segment-group-item-context.ts'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'> {}
export interface SegmentGroupItemProps extends HTMLProps<'label'>, SegmentGroupItemBaseProps {}

export const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled', 'invalid'])

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(() => segmentGroup().getItemProps(itemProps), localProps)

  const itemState = createMemo(() => segmentGroup().getItemState(itemProps))

  return (
    <SegmentGroupItemPropsProvider value={itemProps}>
      <SegmentGroupItemProvider value={itemState}>
        <ark.label {...mergedProps} />
      </SegmentGroupItemProvider>
    </SegmentGroupItemPropsProvider>
  )
}
