import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadLabelBaseProps extends PolymorphicProps {}
export interface SignaturePadLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    SignaturePadLabelBaseProps {}

export const SignaturePadLabel = forwardRef<HTMLLabelElement, SignaturePadLabelProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SignaturePadLabel.displayName = 'SignaturePadLabel'
