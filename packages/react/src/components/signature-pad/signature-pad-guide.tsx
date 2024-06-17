import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadGuideBaseProps extends PolymorphicProps {}
export interface SignaturePadGuideProps
  extends HTMLAttributes<HTMLDivElement>,
    SignaturePadGuideBaseProps {}

export const SignaturePadGuide = forwardRef<HTMLDivElement, SignaturePadGuideProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getGuideProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SignaturePadGuide.displayName = 'SignaturePadGuide'
