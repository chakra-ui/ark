'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UsePinInputReturn } from './use-pin-input.ts'
import { PinInputProvider } from './use-pin-input-context.ts'
import type { RootState } from '@zag-js/pin-input'

interface RootProviderProps {
  value: UsePinInputReturn
}

export interface PinInputRootProviderState extends RootState {}

export interface PinInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps<PinInputRootProviderState> {}
export interface PinInputRootProviderProps extends HTMLProps<'div'>, PinInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const PinInputRootProvider = forwardRef<HTMLDivElement, PinInputRootProviderProps>((props, ref) => {
  const [{ value: pinInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(pinInput.getRootProps(), localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} ref={ref} state={pinInput.getRootState()} />
    </PinInputProvider>
  )
})

PinInputRootProvider.displayName = 'PinInputRootProvider'
