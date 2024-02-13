import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { ClipboardProvider } from './clipboard-context'
import { useClipboard, type UseClipboardProps, type UseClipboardReturn } from './use-clipboard'

export interface ClipboardRootProps
  extends Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseClipboardReturn) => ReactNode)
      }
    >,
    UseClipboardProps {}

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, { children, ...localProps }] = createSplitProps<UseClipboardProps>()(
    props,
    ['getRootNode', 'id', 'ids', 'value', 'timeout', 'onCopyStatusChange'],
  )
  const api = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(api.rootProps, localProps)
  const view = runIfFn(children, api)

  return (
    <ClipboardProvider value={api}>
      <ark.div ref={ref} {...mergedProps}>
        {view}
      </ark.div>
    </ClipboardProvider>
  )
})

ClipboardRoot.displayName = 'ClipboardRoot'
