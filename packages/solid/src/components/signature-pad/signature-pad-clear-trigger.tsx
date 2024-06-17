import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface SignaturePadClearTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    SignaturePadClearTriggerBaseProps {}

export const SignaturePadClearTrigger = (props: SignaturePadClearTriggerProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
