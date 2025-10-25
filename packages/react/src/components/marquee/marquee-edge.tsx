import type { EdgeProps } from '@zag-js/marquee'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps {}
export interface MarqueeEdgeProps extends HTMLProps<'div'>, MarqueeEdgeBaseProps {}

export const MarqueeEdge = forwardRef<HTMLDivElement, MarqueeEdgeProps>((props, ref) => {
  const [edgeProps, localProps] = createSplitProps<EdgeProps>()(props, ['side'])
  const marquee = useMarqueeContext()
  const mergedProps = mergeProps(marquee.getEdgeProps(edgeProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

MarqueeEdge.displayName = 'MarqueeEdge'
