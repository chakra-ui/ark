import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardControlProps extends HTMLArkProps<'div'> {}

export const ClipboardControl = (props: ClipboardControlProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
