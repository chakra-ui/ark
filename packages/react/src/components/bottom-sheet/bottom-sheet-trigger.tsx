import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { usePresenceContext } from '../presence'

export interface BottomSheetTriggerBaseProps extends PolymorphicProps {}
export interface BottomSheetTriggerProps extends HTMLProps<'button'>, BottomSheetTriggerBaseProps {}

export const BottomSheetTrigger = forwardRef<HTMLButtonElement, BottomSheetTriggerProps>((props, ref) => {
  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...bottomSheet.getTriggerProps(),
      'aria-controls': presence.unmounted ? undefined : bottomSheet.getTriggerProps()['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

BottomSheetTrigger.displayName = 'BottomSheetTrigger'
