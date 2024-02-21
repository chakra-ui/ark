import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter'

interface ElementProps extends UseSplitterProps {
  children?: JSX.Element | ((api: UseSplitterReturn) => JSX.Element)
}

export interface SplitterRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const SplitterRoot: ArkComponent<'div', SplitterRootProps> = (props: SplitterRootProps) => {
  const [splitterParams, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'onSizeChangeStart',
    'orientation',
    'size',
  ])

  const api = useSplitter(splitterParams)
  const getChildren = () => runIfFn(localProps.children, api)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </SplitterProvider>
  )
}
