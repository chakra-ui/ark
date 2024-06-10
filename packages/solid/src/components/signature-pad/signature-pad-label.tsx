import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadLabelProps extends HTMLArkProps<'label'> {}

export const SignaturePadLabel = (props: SignaturePadLabelProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
