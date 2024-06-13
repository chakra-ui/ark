import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export type SignaturePadClearTriggerBaseProps = {}
export interface SignaturePadClearTriggerProps
  extends HTMLArkProps<'button'>,
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
