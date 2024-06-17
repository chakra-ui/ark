import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ClipboardLabelProps extends HTMLProps<'label'>, ClipboardLabelBaseProps {}

export const ClipboardLabel = (props: ClipboardLabelProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
