import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseClipboardProps, useClipboard } from './use-clipboard'
import { ClipboardProvider } from './use-clipboard-context'

export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps {}
export interface ClipboardRootProps
  extends HTMLAttributes<HTMLDivElement>,
    ClipboardRootBaseProps {}

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, localProps] = createSplitProps<UseClipboardProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
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
