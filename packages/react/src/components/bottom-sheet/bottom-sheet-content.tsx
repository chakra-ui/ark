import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/bottom-sheet'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { createSplitProps } from '../../utils/create-split-props'

export interface BottomSheetContentBaseProps extends PolymorphicProps, ContentProps {}
export interface BottomSheetContentProps extends Omit<HTMLProps<'div'>, 'draggable'>, BottomSheetContentBaseProps {}

const splitContentProps = createSplitProps<ContentProps>()

export const BottomSheetContent = forwardRef<HTMLDivElement, BottomSheetContentProps>((props, ref) => {
  const [contentProps, localProps] = splitContentProps(props, ['draggable'])
  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    bottomSheet.getContentProps({ draggable: true, ...contentProps }),
    presence.getPresenceProps(),
    localProps,
  )

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

BottomSheetContent.displayName = 'BottomSheetContent'
