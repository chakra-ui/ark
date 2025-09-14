import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { usePresenceContext } from '../presence'

export interface BottomSheetTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface BottomSheetTriggerProps extends HTMLProps<'button'>, BottomSheetTriggerBaseProps {}

export const BottomSheetTrigger = (props: BottomSheetTriggerProps) => {
  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => bottomSheet().getTriggerProps(),
    () => ({ 'aria-controls': presence().unmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}
