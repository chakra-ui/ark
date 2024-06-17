import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseClipboardProps, useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps<'div'> {}
export interface ClipboardRootProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ClipboardRootBaseProps {}

export const ClipboardRoot = (props: ClipboardRootProps) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
    'timeout',
    'value',
  ])
  const api = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ClipboardProvider value={api}>
      <ark.div {...mergedProps} />
    </ClipboardProvider>
  )
}
