import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export type ClipboardLabelBaseProps = {}
export interface ClipboardLabelProps extends HTMLArkProps<'label'>, ClipboardLabelBaseProps {}

export const ClipboardLabel = forwardRef<HTMLLabelElement, ClipboardLabelProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ClipboardLabel.displayName = 'ClipboardLabel'
