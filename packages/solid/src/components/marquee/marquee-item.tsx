import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMarqueeContext } from './use-marquee-context.ts'

export interface MarqueeItemBaseProps extends PolymorphicProps<'div'> {}
export interface MarqueeItemProps extends HTMLProps<'div'>, MarqueeItemBaseProps {}

export const MarqueeItem = (props: MarqueeItemProps) => {
  const context = useMarqueeContext()
  const mergedProps = mergeProps(() => context().getItemProps(), props)
  return <ark.div {...mergedProps} />
}
