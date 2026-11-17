import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadControlBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadControlProps extends HTMLProps<'div'>, SignaturePadControlBaseProps {}

export const SignaturePadControl = (props: SignaturePadControlProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getControlProps(), props)
  const field = useFieldContext()

  return <ark.div aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
