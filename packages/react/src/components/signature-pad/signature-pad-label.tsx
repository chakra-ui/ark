import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadLabelProps extends HTMLArkProps<'label'> {}

export const SignaturePadLabel = forwardRef<HTMLLabelElement, SignaturePadLabelProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SignaturePadLabel.displayName = 'SignaturePadLabel'
