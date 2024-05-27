import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemHiddenInputProps extends HTMLArkProps<'input'> {}

export const SegmentGroupItemHiddenInput = (props: SegmentGroupItemHiddenInputProps) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(() => segmentGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
