'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { ark } from '../factory.ts'
import { type UseSwapProps, useSwap } from './use-swap.ts'
import { SwapProvider } from './use-swap-context.ts'

export interface SwapRootBaseProps extends UseSwapProps, PolymorphicProps {}

export interface SwapRootProps extends HTMLProps<'span'>, SwapRootBaseProps {}

export const SwapRoot = forwardRef<HTMLSpanElement, SwapRootProps>((props, ref) => {
  const { children, swap: swapProp, lazyMount, unmountOnExit, hideMode, ...restProps } = props
  const swap = useSwap({ swap: swapProp, lazyMount, unmountOnExit, hideMode })
  const mergedProps = mergeProps(swap.getRootProps(), restProps)

  return (
    <SwapProvider value={swap}>
      <ark.span {...mergedProps} ref={ref}>
        {children}
      </ark.span>
    </SwapProvider>
  )
})

SwapRoot.displayName = 'SwapRoot'
