import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadControlProps extends HTMLArkProps<'div'> {}

export const SignaturePadControl = (props: SignaturePadControlProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getControlProps(), props)

  return <ark.div role="application" {...mergedProps} />
}
