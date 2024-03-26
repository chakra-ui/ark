import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardTriggerProps extends HTMLArkProps<'button'> {}

export const ClipboardTrigger = forwardRef<HTMLButtonElement, ClipboardTriggerProps>(
  (props, ref) => {
    const context = useClipboardContext()
    const mergedProps = mergeProps(context.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

ClipboardTrigger.displayName = 'ClipboardTrigger'
