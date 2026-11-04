import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseTocProps, useToc } from './use-toc.ts'
import { TocProvider } from './use-toc-context.ts'

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
    'multiple',
    'onActiveChange',
    'rootMargin',
    'scrollBehavior',
    'threshold',
  ])
  const toc = useToc(useTocProps)
  const mergedProps = mergeProps(() => toc().getRootProps(), localProps)

  return (
    <TocProvider value={toc}>
      <ark.div {...mergedProps} />
    </TocProvider>
  )
}
