import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardControlBaseProps extends PolymorphicProps<'div'> {}
export interface ClipboardControlProps extends HTMLProps<'div'>, ClipboardControlBaseProps {}

export const ClipboardControl = (props: ClipboardControlProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
