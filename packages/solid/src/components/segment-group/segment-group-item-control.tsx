import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'span'> {}
export interface SegmentGroupItemControlProps extends HTMLProps<'span'>, SegmentGroupItemControlBaseProps {}

export const SegmentGroupItemControl = (props: SegmentGroupItemControlProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(() => segmentGroup().getItemControlProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
