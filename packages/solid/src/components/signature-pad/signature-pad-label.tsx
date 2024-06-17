import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadLabelBaseProps extends PolymorphicProps<'label'> {}
export interface SignaturePadLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    SignaturePadLabelBaseProps {}

export const SignaturePadLabel = (props: SignaturePadLabelProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
