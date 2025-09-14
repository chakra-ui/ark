import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetGrabberBaseProps extends PolymorphicProps<'div'> {}
export interface BottomSheetGrabberProps extends HTMLProps<'div'>, BottomSheetGrabberBaseProps {}

export const BottomSheetGrabber = (props: BottomSheetGrabberProps) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(() => bottomSheet().getGrabberProps(), props)

  return <ark.div {...mergedProps} />
}
