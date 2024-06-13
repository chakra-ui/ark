import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export type SignaturePadControlBaseProps = {}
export interface SignaturePadControlProps
  extends HTMLArkProps<'div'>,
    SignaturePadControlBaseProps {}

export const SignaturePadControl = forwardRef<HTMLDivElement, SignaturePadControlProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getControlProps(), props)

    // TODO remove with next zag release
    return <ark.div role="application" {...mergedProps} ref={ref} />
  },
)

SignaturePadControl.displayName = 'SignaturePadControl'
