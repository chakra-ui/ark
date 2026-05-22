'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadGuideBaseProps extends PolymorphicProps {}
export interface SignaturePadGuideProps extends HTMLProps<'div'>, SignaturePadGuideBaseProps {}

export const SignaturePadGuide = ({ ref, ...props }: SignaturePadGuideProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getGuideProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

SignaturePadGuide.displayName = 'SignaturePadGuide'
