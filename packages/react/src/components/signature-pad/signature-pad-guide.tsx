import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export type SignaturePadGuideBaseProps = {}
export interface SignaturePadGuideProps extends HTMLArkProps<'div'>, SignaturePadGuideBaseProps {}

export const SignaturePadGuide = forwardRef<HTMLDivElement, SignaturePadGuideProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getGuideProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SignaturePadGuide.displayName = 'SignaturePadGuide'
