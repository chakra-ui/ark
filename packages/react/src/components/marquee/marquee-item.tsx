'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMarqueeContext } from './use-marquee-context'

export interface MarqueeItemBaseProps extends PolymorphicProps {}
export interface MarqueeItemProps extends HTMLProps<'div'>, MarqueeItemBaseProps {}

export const MarqueeItem = ({ ref, ...props }: MarqueeItemProps) => {
  const marquee = useMarqueeContext()
  const mergedProps = mergeProps(marquee.getItemProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

MarqueeItem.displayName = 'MarqueeItem'
