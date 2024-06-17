import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps {}
export interface SignaturePadClearTriggerProps
  extends HTMLProps<'button'>,
    SignaturePadClearTriggerBaseProps {}

export const SignaturePadClearTrigger = forwardRef<
  HTMLButtonElement,
  SignaturePadClearTriggerProps
>((props, ref) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

SignaturePadClearTrigger.displayName = 'SignaturePadClearTrigger'
