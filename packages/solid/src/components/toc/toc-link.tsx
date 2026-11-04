import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTocContext } from './use-toc-context.ts'
import { useTocItemPropsContext } from './use-toc-item-props-context.ts'
import type { Assign } from '../../types.ts'

export interface TocLinkBaseProps extends PolymorphicProps<'a'> {}
export interface TocLinkProps extends Assign<HTMLProps<'a'>, TocLinkBaseProps> {}

export const TocLink = (props: TocLinkProps) => {
  const toc = useTocContext()
  const itemProps = useTocItemPropsContext()
  const mergedProps = mergeProps(() => toc().getLinkProps(itemProps), props)
  return <ark.a {...mergedProps} />
}
