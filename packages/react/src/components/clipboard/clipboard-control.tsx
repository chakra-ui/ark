import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardControlBaseProps extends PolymorphicProps {}
export interface ClipboardControlProps
  extends HTMLAttributes<HTMLDivElement>,
    ClipboardControlBaseProps {}

export const ClipboardControl = forwardRef<HTMLDivElement, ClipboardControlProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ClipboardControl.displayName = 'ClipboardControl'
