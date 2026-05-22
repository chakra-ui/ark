'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadLabelBaseProps extends PolymorphicProps {}
export interface SignaturePadLabelProps extends HTMLProps<'label'>, SignaturePadLabelBaseProps {}

export const SignaturePadLabel = ({ ref, ...props }: SignaturePadLabelProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
}

SignaturePadLabel.displayName = 'SignaturePadLabel'
