import { anatomy } from '@zag-js/segmentGroup'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupItemControlProps
  extends HTMLProps<'div'>,
    SegmentGroupItemControlBaseProps {}

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getItemControlProps(itemProps),
    segmentGroupAnatomy.build().itemControl.attrs,
    props,
  )

  return <ark.div {...mergedProps} />
}
