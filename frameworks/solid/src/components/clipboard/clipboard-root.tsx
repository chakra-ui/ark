import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type UseClipboardProps, useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootProps extends Assign<HTMLArkProps<'div'>, UseClipboardProps> {}

export const ClipboardRoot = (props: ClipboardRootProps) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'getRootNode',
    'id',
    'ids',
    'value',
    'timeout',
    'onCopyStatusChange',
  ])
  const api = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <ClipboardProvider value={api}>
      <ark.div {...mergedProps} />
    </ClipboardProvider>
  )
}
