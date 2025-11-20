import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseClipboardProps, useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps {}
export interface ClipboardRootProps extends Assign<HTMLProps<'div'>, ClipboardRootBaseProps> {}

const splitRootProps = createSplitProps<UseClipboardProps>()

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'id',
    'ids',
    'onStatusChange',
    'onValueChange',
    'timeout',
    'value',
  ])
  const clipboard = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(clipboard.getRootProps(), localProps)

  return (
    <ClipboardProvider value={clipboard}>
      <ark.div ref={ref} {...mergedProps} />
    </ClipboardProvider>
  )
})

ClipboardRoot.displayName = 'ClipboardRoot'
