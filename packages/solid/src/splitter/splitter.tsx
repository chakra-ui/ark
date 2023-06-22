import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter'

export type SplitterProps = Assign<
  HTMLArkProps<'div'>,
  UseSplitterProps & {
    children?: JSX.Element | ((pages: UseSplitterReturn) => JSX.Element)
  }
>

export const Splitter = (props: SplitterProps) => {
  const [splitterParams, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onResize',
    'onResizeEnd',
    'onResizeStart',
    'orientation',
    'size',
  ])

  const api = useSplitter(splitterParams)
  const getChildren = () => runIfFn(localProps.children, api)
  const rootProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...rootProps}>{getChildren()}</ark.div>
    </SplitterProvider>
  )
}
