import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseSwapProps, useSwap } from './use-swap.ts'
import { SwapProvider } from './use-swap-context.ts'

export interface SwapRootBaseProps extends UseSwapProps, PolymorphicProps<'span'> {}

export interface SwapRootProps extends HTMLProps<'span'>, SwapRootBaseProps {}

export const SwapRoot = (props: SwapRootProps) => {
  const [swapProps, localProps] = splitProps(props, ['swap', 'lazyMount', 'unmountOnExit'])
  const swap = useSwap(() => swapProps)
  const mergedProps = mergeProps(() => swap().getRootProps(), localProps)

  return (
    <SwapProvider value={swap}>
      <ark.span {...mergedProps} />
    </SwapProvider>
  )
}
