import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import type { UseSwapReturn } from './use-swap'
import { SwapProvider } from './use-swap-context'

export interface SwapRootProviderBaseProps extends PolymorphicProps {
  value: UseSwapReturn
}

export interface SwapRootProviderProps extends HTMLProps<'span'>, SwapRootProviderBaseProps {}

export const SwapRootProvider = forwardRef<HTMLSpanElement, SwapRootProviderProps>((props, ref) => {
  const { value, children, ...restProps } = props
  const mergedProps = mergeProps(value.getRootProps(), restProps)

  return (
    <SwapProvider value={value}>
      <ark.span {...mergedProps} ref={ref}>
        {children}
      </ark.span>
    </SwapProvider>
  )
})

SwapRootProvider.displayName = 'SwapRootProvider'
