import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter'

export type SplitterProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  UseSplitterProps & {
    children?: ReactNode | ((state: UseSplitterReturn) => ReactNode)
  }
>

export const Splitter = forwardRef<HTMLDivElement, SplitterProps>((props, ref) => {
  const [useSplitterProps, { children, ...divProps }] = createSplitProps<UseSplitterProps>()(
    props,
    [
      'defaultSize',
      'dir',
      'getRootNode',
      'id',
      'ids',
      'onResize',
      'onResizeEnd',
      'onResizeStart',
      'orientation',
      'size',
    ],
  )
  const splitter = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(splitter.rootProps, divProps)
  const view = runIfFn(children, splitter)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SplitterProvider>
  )
})

Splitter.displayName = 'Splitter'
