import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardTriggerBaseProps extends PolymorphicProps {}
export interface ClipboardTriggerProps extends HTMLProps<'button'>, ClipboardTriggerBaseProps {}

export const ClipboardTrigger = forwardRef<HTMLButtonElement, ClipboardTriggerProps>(
  (props, ref) => {
    const clipboard = useClipboardContext()
    const mergedProps = mergeProps(clipboard.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ClipboardTrigger.displayName = 'ClipboardTrigger'
