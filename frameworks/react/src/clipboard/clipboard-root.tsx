import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useClipboard, type UseClipboardProps } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootProps extends Assign<HTMLArkProps<'div'>, UseClipboardProps> {}

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'getRootNode',
    'id',
    'ids',
    'value',
    'timeout',
    'onCopyStatusChange',
  ])
  const clipboard = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(clipboard.rootProps, localProps)

  return (
    <ClipboardProvider value={clipboard}>
      <ark.div ref={ref} {...mergedProps} />
    </ClipboardProvider>
  )
})

ClipboardRoot.displayName = 'ClipboardRoot'
