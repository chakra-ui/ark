import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseClipboardProps, useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootProps extends Assign<HTMLArkProps<'div'>, UseClipboardProps> {}

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
    'timeout',
    'value',
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
