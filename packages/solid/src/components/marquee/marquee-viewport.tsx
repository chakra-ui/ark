import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeViewportBaseProps extends PolymorphicProps<'div'> {}
export interface MarqueeViewportProps extends HTMLProps<'div'>, MarqueeViewportBaseProps {}

export const MarqueeViewport = (props: MarqueeViewportProps) => {
  const context = useMarqueeContext()
  const mergedProps = mergeProps(() => context().getViewportProps(), props)
  return <ark.div {...mergedProps} />
}
