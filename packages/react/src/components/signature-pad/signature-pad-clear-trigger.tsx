import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadClearTriggerProps extends HTMLArkProps<'button'> {}

export const SignaturePadClearTrigger = forwardRef<
  HTMLButtonElement,
  SignaturePadClearTriggerProps
>((props, ref) => {
  const signature = useSignaturePadContext()
  const mergedProps = mergeProps(signature.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

SignaturePadClearTrigger.displayName = 'SignaturePadClearTrigger'
