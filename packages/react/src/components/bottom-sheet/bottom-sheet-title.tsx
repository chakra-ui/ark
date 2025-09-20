import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetTitleBaseProps extends PolymorphicProps {}
export interface BottomSheetTitleProps extends HTMLProps<'h2'>, BottomSheetTitleBaseProps {}

export const BottomSheetTitle = forwardRef<HTMLHeadingElement, BottomSheetTitleProps>((props, ref) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(bottomSheet.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

BottomSheetTitle.displayName = 'BottomSheetTitle'
