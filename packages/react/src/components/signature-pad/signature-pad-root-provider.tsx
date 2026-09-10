'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseSignaturePadReturn } from './use-signature-pad.ts'
import { SignaturePadProvider } from './use-signature-pad-context.ts'
import type { RootState } from '@zag-js/signature-pad'

interface RootProviderProps {
  value: UseSignaturePadReturn
}

export interface SignaturePadRootProviderState extends RootState {}

export interface SignaturePadRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<SignaturePadRootProviderState> {}
export interface SignaturePadRootProviderProps extends HTMLProps<'div'>, SignaturePadRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SignaturePadRootProvider = forwardRef<HTMLDivElement, SignaturePadRootProviderProps>((props, ref) => {
  const [{ value: signaturePad }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(signaturePad.getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} ref={ref} state={signaturePad.getRootState()} />
    </SignaturePadProvider>
  )
})

SignaturePadRootProvider.displayName = 'SignaturePadRootProvider'
