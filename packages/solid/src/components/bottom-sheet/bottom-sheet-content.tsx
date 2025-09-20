import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { ContentProps } from '@zag-js/bottom-sheet'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { usePresenceContext } from '../presence'
import { composeRefs } from '../../utils/compose-refs'

export interface BottomSheetContentBaseProps extends PolymorphicProps<'div'>, ContentProps {}
export interface BottomSheetContentProps extends Omit<HTMLProps<'div'>, 'draggable'>, BottomSheetContentBaseProps {}

export const BottomSheetContent = (props: BottomSheetContentProps) => {
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['draggable'])
  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => bottomSheet().getContentProps({ draggable: true, ...contentProps }),
    () => presence().presenceProps,
    localProps,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, localProps.ref)} />
    </Show>
  )
}
