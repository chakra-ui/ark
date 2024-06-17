import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ClipboardTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ClipboardTriggerBaseProps {}

export const ClipboardTrigger = (props: ClipboardTriggerProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
