import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeItemBaseProps extends PolymorphicProps {}
export interface MarqueeItemProps extends HTMLProps<'div'>, MarqueeItemBaseProps {}

export const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>((props, ref) => {
  const marquee = useMarqueeContext()
  const mergedProps = mergeProps(marquee.getItemProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MarqueeItem.displayName = 'MarqueeItem'
