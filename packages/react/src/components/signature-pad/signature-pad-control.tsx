'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps extends HTMLProps<'div'>, SignaturePadControlBaseProps {}

export const SignaturePadControl = ({ ref, ...props }: SignaturePadControlProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

SignaturePadControl.displayName = 'SignaturePadControl'
