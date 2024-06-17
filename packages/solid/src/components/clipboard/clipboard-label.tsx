import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ClipboardLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    ClipboardLabelBaseProps {}

export const ClipboardLabel = (props: ClipboardLabelProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
