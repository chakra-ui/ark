import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardLabelProps extends HTMLArkProps<'label'> {}

export const ClipboardLabel = forwardRef<HTMLLabelElement, ClipboardLabelProps>((props, ref) => {
  const context = useClipboardContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

ClipboardLabel.displayName = 'ClipboardLabel'
