import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTocProps, useToc } from './use-toc'
import { TocProvider } from './use-toc-context'

export interface TocRootBaseProps extends UseTocProps, PolymorphicProps<'div'> {}
export interface TocRootProps extends Assign<HTMLProps<'div'>, TocRootBaseProps> {}

const splitRootProps = createSplitProps<UseTocProps>()

export const TocRoot = (props: TocRootProps) => {
  const [useTocProps, localProps] = splitRootProps(props, [
    'activeIds',
    'autoScroll',
    'defaultActiveIds',
    'scrollEl',
    'id',
    'ids',
    'items',
    'onActiveChange',
    'rootMargin',
    'scrollBehavior',
    'threshold',
  ])
  const toc = useToc(useTocProps)
  const mergedProps = mergeProps(() => {
    const { id: _, 'aria-labelledby': __, ...rootProps } = toc().getRootProps()
    return rootProps
  }, localProps)

  return (
    <TocProvider value={toc}>
      <ark.div {...mergedProps} />
    </TocProvider>
  )
}
