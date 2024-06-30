import { anatomy } from '@zag-js/segmentGroup'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface SegmentGroupItemTextProps
  extends HTMLProps<'span'>,
    SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = (props: SegmentGroupItemTextProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    () => segmentGroup().getItemTextProps(itemProps),
    segmentGroupAnatomy.build().itemText.attrs,
    props,
  )

  return <ark.span {...mergedProps} />
}
