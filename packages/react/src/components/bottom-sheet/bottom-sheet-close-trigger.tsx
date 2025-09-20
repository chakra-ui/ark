import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetCloseTriggerBaseProps extends PolymorphicProps {}
export interface BottomSheetCloseTriggerProps extends HTMLProps<'button'>, BottomSheetCloseTriggerBaseProps {}

export const BottomSheetCloseTrigger = forwardRef<HTMLButtonElement, BottomSheetCloseTriggerProps>((props, ref) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(bottomSheet.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

BottomSheetCloseTrigger.displayName = 'BottomSheetCloseTrigger'
