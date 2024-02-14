import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { ClipboardProvider } from './clipboard-context'
import { useClipboard, type UseClipboardProps, type UseClipboardReturn } from './use-clipboard'

interface ElementProps extends UseClipboardProps {
  children?: JSX.Element | ((api: UseClipboardReturn) => JSX.Element)
}

export interface ClipboardRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const ClipboardRoot: ArkComponent<'div', ElementProps> = (props: ClipboardRootProps) => {
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
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ClipboardProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </ClipboardProvider>
  )
}
