import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTocProps, useToc } from './use-toc'
import { TocProvider } from './use-toc-context'

export interface TocRootBaseProps extends UseTocProps, PolymorphicProps {}
export interface TocRootProps extends Assign<HTMLProps<'div'>, TocRootBaseProps> {}

const splitRootProps = createSplitProps<UseTocProps>()

export const TocRoot = forwardRef<HTMLDivElement, TocRootProps>((props, ref) => {
  const [useTocProps, localProps] = splitRootProps(props, [
    'activeIds',
    'autoScroll',
    'defaultActiveIds',
    'getScrollEl',
    'id',
    'ids',
    'items',
    'onActiveChange',
    'rootMargin',
    'scrollBehavior',
    'threshold',
  ])
  const toc = useToc(useTocProps)

  return (
    <TocProvider value={toc}>
      <ark.div {...localProps} ref={ref} />
    </TocProvider>
  )
})

TocRoot.displayName = 'TocRoot'
