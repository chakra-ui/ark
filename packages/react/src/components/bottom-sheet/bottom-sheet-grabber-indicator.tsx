import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetGrabberIndicatorBaseProps extends PolymorphicProps {}
export interface BottomSheetGrabberIndicatorProps extends HTMLProps<'div'>, BottomSheetGrabberIndicatorBaseProps {}

export const BottomSheetGrabberIndicator = forwardRef<HTMLDivElement, BottomSheetGrabberIndicatorProps>(
  (props, ref) => {
    const bottomSheet = useBottomSheetContext()
    const mergedProps = mergeProps(bottomSheet.getGrabberIndicatorProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

BottomSheetGrabberIndicator.displayName = 'BottomSheetGrabberIndicator'
