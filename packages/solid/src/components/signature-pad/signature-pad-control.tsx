import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadControlBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SignaturePadControlBaseProps {}

export const SignaturePadControl = (props: SignaturePadControlProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getControlProps(), props)

  return <ark.div role="application" {...mergedProps} />
}
