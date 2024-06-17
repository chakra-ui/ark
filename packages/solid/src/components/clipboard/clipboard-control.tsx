import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardControlBaseProps extends PolymorphicProps<'div'> {}
export interface ClipboardControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ClipboardControlBaseProps {}

export const ClipboardControl = (props: ClipboardControlProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
