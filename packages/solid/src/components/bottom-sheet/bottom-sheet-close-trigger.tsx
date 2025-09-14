import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface BottomSheetCloseTriggerProps extends HTMLProps<'button'>, BottomSheetCloseTriggerBaseProps {}

export const BottomSheetCloseTrigger = (props: BottomSheetCloseTriggerProps) => {
  const context = useBottomSheetContext()
  const mergedProps = mergeProps(() => context().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
