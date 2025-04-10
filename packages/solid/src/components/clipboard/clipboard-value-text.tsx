import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ClipboardValueTextProps extends HTMLProps<'span'>, ClipboardValueTextBaseProps {}

export const ClipboardValueText = (props: ClipboardValueTextProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(props)

  return <ark.span {...mergedProps}>{props.children || api().value}</ark.span>
}
