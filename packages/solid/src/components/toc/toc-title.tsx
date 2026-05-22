import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface TocTitleProps extends HTMLProps<'h2'>, TocTitleBaseProps {}

export const TocTitle = (props: TocTitleProps) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(() => toc().getTitleProps(), props)
  return <ark.h2 {...mergedProps} />
}
