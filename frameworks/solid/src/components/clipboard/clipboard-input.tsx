import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardInputProps extends HTMLArkProps<'input'> {}

export const ClipboardInput = (props: ClipboardInputProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().inputProps, props)

  return <ark.input {...mergedProps} />
}
