import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemHiddenInputProps
  extends HTMLProps<'input'>,
    SegmentGroupItemHiddenInputBaseProps {}

export const SegmentGroupItemHiddenInput = forwardRef<
  HTMLInputElement,
  SegmentGroupItemHiddenInputProps
>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(segmentGroup.getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} ref={ref} />
})

SegmentGroupItemHiddenInput.displayName = 'SegmentGroupItemHiddenInput'
