'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseMarqueeReturn } from './use-marquee.ts'
import { MarqueeProvider } from './use-marquee-context.ts'

interface RootProviderProps {
  value: UseMarqueeReturn
}

export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MarqueeRootProviderProps extends HTMLProps<'div'>, MarqueeRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const MarqueeRootProvider = forwardRef<HTMLDivElement, MarqueeRootProviderProps>((props, ref) => {
  const [{ value: marquee }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(marquee.getRootProps(), localProps)

  return (
    <MarqueeProvider value={marquee}>
      <ark.div {...mergedProps} ref={ref} />
    </MarqueeProvider>
  )
})

MarqueeRootProvider.displayName = 'MarqueeRootProvider'
