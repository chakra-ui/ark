import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetBackdropBaseProps extends PolymorphicProps {}
export interface BottomSheetBackdropProps extends HTMLProps<'div'>, BottomSheetBackdropBaseProps {}

export const BottomSheetBackdrop = forwardRef<HTMLDivElement, BottomSheetBackdropProps>((props, ref) => {
  const bottomSheet = useBottomSheetContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: bottomSheet.open })
  const mergedProps = mergeProps(bottomSheet.getBackdropProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

BottomSheetBackdrop.displayName = 'BottomSheetBackdrop'
