import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocListBaseProps extends PolymorphicProps<'ul'> {}
export interface TocListProps extends HTMLProps<'ul'>, TocListBaseProps {}

export const TocList = (props: TocListProps) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(() => toc().getListProps(), props)

  return <ark.ul {...mergedProps} />
}
