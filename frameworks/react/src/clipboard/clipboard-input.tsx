import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardInputProps extends HTMLArkProps<'input'> {}

export const ClipboardInput = forwardRef<HTMLInputElement, ClipboardInputProps>((props, ref) => {
  const context = useClipboardContext()
  const mergedProps = mergeProps(context.inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

ClipboardInput.displayName = 'ClipboardInput'
