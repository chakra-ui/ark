import type { EdgeProps } from '@zag-js/marquee'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps<'div'> {}
export interface MarqueeEdgeProps extends HTMLProps<'div'>, MarqueeEdgeBaseProps {}

export const MarqueeEdge = (props: MarqueeEdgeProps) => {
  const [edgeProps, localProps] = createSplitProps<EdgeProps>()(props, ['side'])
  const context = useMarqueeContext()
  const mergedProps = mergeProps(() => context().getEdgeProps(edgeProps), localProps)
  return <ark.div {...mergedProps} />
}
