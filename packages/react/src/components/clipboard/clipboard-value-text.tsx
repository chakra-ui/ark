import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardValueTextBaseProps extends PolymorphicProps {}
export interface ClipboardValueTextProps extends HTMLProps<'span'>, ClipboardValueTextBaseProps {}

export const ClipboardValueText = forwardRef<HTMLDivElement, ClipboardValueTextProps>((props, ref) => {
  const clipboard = useClipboardContext()
  return (
    <ark.span {...props} ref={ref}>
      {props.children || clipboard.value}
    </ark.span>
  )
})

ClipboardValueText.displayName = 'ClipboardValueText'
