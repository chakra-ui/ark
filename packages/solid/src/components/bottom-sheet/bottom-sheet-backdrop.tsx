import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetBackdropBaseProps extends PolymorphicProps<'div'> {}
export interface BottomSheetBackdropProps extends HTMLProps<'div'>, BottomSheetBackdropBaseProps {}

export const BottomSheetBackdrop = (props: BottomSheetBackdropProps) => {
  const bottomSheet = useBottomSheetContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presence = usePresence(mergeProps(renderStrategyProps, () => ({ present: bottomSheet().open })))
  const mergedProps = mergeProps(
    () => bottomSheet().getBackdropProps(),
    () => presence().presenceProps,
    props,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, props.ref)} />
    </Show>
  )
}
