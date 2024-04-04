import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardTriggerProps extends HTMLArkProps<'button'> {}

export const ClipboardTrigger = (props: ClipboardTriggerProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps()} />
}
