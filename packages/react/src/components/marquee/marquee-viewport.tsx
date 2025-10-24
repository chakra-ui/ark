import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeViewportBaseProps extends PolymorphicProps {}
export interface MarqueeViewportProps extends HTMLProps<'div'>, MarqueeViewportBaseProps {}

export const MarqueeViewport = forwardRef<HTMLDivElement, MarqueeViewportProps>((props, ref) => {
  const marquee = useMarqueeContext()
  const mergedProps = mergeProps(marquee.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MarqueeViewport.displayName = 'MarqueeViewport'
