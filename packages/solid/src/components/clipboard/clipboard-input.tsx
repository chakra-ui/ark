import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardInputBaseProps extends PolymorphicProps<'input'> {}
export interface ClipboardInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    ClipboardInputBaseProps {}

export const ClipboardInput = (props: ClipboardInputProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
