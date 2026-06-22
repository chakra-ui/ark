import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface SegmentGroupItemTextProps extends HTMLProps<'span'>, SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = (props: SegmentGroupItemTextProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(() => segmentGroup().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
