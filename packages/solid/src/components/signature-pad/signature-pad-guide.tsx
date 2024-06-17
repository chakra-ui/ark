import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadGuideBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadGuideProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SignaturePadGuideBaseProps {}

export const SignaturePadGuide = (props: SignaturePadGuideProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getGuideProps(), props)

  return <ark.div {...mergedProps} />
}
