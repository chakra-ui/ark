'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseNumberInputReturn } from './use-number-input.ts'
import { NumberInputProvider } from './use-number-input-context.ts'

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberInputRootProviderProps extends HTMLProps<'div'>, NumberInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const NumberInputRootProvider = forwardRef<HTMLDivElement, NumberInputRootProviderProps>((props, ref) => {
  const [{ value: numberInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(numberInput.getRootProps(), localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInputRootProvider.displayName = 'NumberInputRootProvider'
