import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardInputProps extends HTMLArkProps<'input'> {}

export const ClipboardInput = forwardRef<HTMLInputElement, ClipboardInputProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

ClipboardInput.displayName = 'ClipboardInput'
