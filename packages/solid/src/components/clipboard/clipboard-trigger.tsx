import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ClipboardTriggerProps extends HTMLProps<'button'>, ClipboardTriggerBaseProps {}

export const ClipboardTrigger = (props: ClipboardTriggerProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
