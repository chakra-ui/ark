import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface SegmentGroupItemTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
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
