import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadGuideProps extends HTMLArkProps<'div'> {}

export const SignaturePadGuide = (props: SignaturePadGuideProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getGuideProps(), props)

  return <ark.div {...mergedProps} />
}
