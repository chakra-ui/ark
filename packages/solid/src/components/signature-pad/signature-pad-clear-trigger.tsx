import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadClearTriggerProps extends HTMLArkProps<'button'> {}

export const SignaturePadClearTrigger = (props: SignaturePadClearTriggerProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
