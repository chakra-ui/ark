import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardLabelBaseProps extends PolymorphicProps {}
export interface ClipboardLabelProps extends HTMLProps<'label'>, ClipboardLabelBaseProps {}

export const ClipboardLabel = forwardRef<HTMLLabelElement, ClipboardLabelProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ClipboardLabel.displayName = 'ClipboardLabel'
