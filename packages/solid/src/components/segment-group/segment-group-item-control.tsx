import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupItemControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
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
