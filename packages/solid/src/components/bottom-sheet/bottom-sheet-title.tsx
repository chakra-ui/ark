import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface BottomSheetTitleProps extends HTMLProps<'h2'>, BottomSheetTitleBaseProps {}

export const BottomSheetTitle = (props: BottomSheetTitleProps) => {
  const bottomSheet = useBottomSheetContext()
  const mergedProps = mergeProps(() => bottomSheet().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}
