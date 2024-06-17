import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps
  extends HTMLAttributes<HTMLDivElement>,
    SignaturePadControlBaseProps {}

export const SignaturePadControl = forwardRef<HTMLDivElement, SignaturePadControlProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SignaturePadControl.displayName = 'SignaturePadControl'
