import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface SegmentGroupItemHiddenInputProps extends HTMLProps<'input'>, SegmentGroupItemHiddenInputBaseProps {}

export const SegmentGroupItemHiddenInput = (props: SegmentGroupItemHiddenInputProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(() => segmentGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
