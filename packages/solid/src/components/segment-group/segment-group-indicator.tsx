import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './segment-group.anatomy.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SegmentGroupIndicatorProps extends HTMLProps<'div'>, SegmentGroupIndicatorBaseProps {}

export const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(() => segmentGroup().getIndicatorProps(), parts.indicator.attrs, props)

  return <ark.div {...mergedProps} />
}
