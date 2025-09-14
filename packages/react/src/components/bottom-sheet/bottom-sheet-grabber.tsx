import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetGrabberBaseProps extends PolymorphicProps {}
export interface BottomSheetGrabberProps extends HTMLProps<'div'>, BottomSheetGrabberBaseProps {}

export const BottomSheetGrabber = forwardRef<HTMLDivElement, BottomSheetGrabberProps>((props, ref) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(bottomSheet.getGrabberProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

BottomSheetGrabber.displayName = 'BottomSheetGrabber'
