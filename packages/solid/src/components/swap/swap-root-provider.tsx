import { mergeProps } from '@zag-js/solid'
import { type Accessor, splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSwapReturn } from './use-swap'
import { SwapProvider } from './use-swap-context'

export interface SwapRootProviderBaseProps extends PolymorphicProps<'span'> {
  value: Accessor<UseSwapReturn>
}

export interface SwapRootProviderProps extends HTMLProps<'span'>, SwapRootProviderBaseProps {}

export const SwapRootProvider = (props: SwapRootProviderProps) => {
  const [providerProps, localProps] = splitProps(props, ['value'])
  const mergedProps = mergeProps(() => providerProps.value().getRootProps(), localProps)

  return (
    <SwapProvider value={providerProps.value}>
      <ark.span {...mergedProps} />
    </SwapProvider>
  )
}
