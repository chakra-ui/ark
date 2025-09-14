import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetGrabberIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface BottomSheetGrabberIndicatorProps extends HTMLProps<'div'>, BottomSheetGrabberIndicatorBaseProps {}

export const BottomSheetGrabberIndicator = (props: BottomSheetGrabberIndicatorProps) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(() => bottomSheet().getGrabberIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
