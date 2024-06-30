import { mergeProps } from '@zag-js/react'
import { anatomy } from '@zag-js/segmentGroup'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps
  extends HTMLProps<'span'>,
    SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = forwardRef<HTMLSpanElement, SegmentGroupItemTextProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()
    const mergedProps = mergeProps(
      segmentGroup.getItemTextProps(itemProps),
      segmentGroupAnatomy.build().itemText.attrs as Record<string, string>,
      props,
    )

    return <ark.span {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemText.displayName = 'SegmentGroupItemText'
