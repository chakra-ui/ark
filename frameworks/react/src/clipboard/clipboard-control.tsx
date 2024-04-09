import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardControlProps extends HTMLArkProps<'div'> {}

export const ClipboardControl = forwardRef<HTMLDivElement, ClipboardControlProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ClipboardControl.displayName = 'ClipboardControl'
