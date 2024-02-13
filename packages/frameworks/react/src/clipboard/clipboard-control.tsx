import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardControlProps extends HTMLArkProps<'div'> {}

export const ClipboardControl = forwardRef<HTMLDivElement, ClipboardControlProps>((props, ref) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ClipboardControl.displayName = 'ClipboardControl'
