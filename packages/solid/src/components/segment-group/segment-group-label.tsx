import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './segment-group.anatomy.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'span'> {}
export interface SegmentGroupLabelProps extends HTMLProps<'span'>, SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = (props: SegmentGroupLabelProps) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(() => segmentGroup().getLabelProps(), parts.label.attrs, props)

  return <ark.span {...mergedProps} />
}
