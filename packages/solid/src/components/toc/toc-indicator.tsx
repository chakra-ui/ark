import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface TocIndicatorProps extends HTMLProps<'div'>, TocIndicatorBaseProps {}

export const TocIndicator = (props: TocIndicatorProps) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(() => toc.getRootProps(), props)
  return <ark.div {...mergedProps} />
}
