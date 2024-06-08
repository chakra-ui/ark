import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'

import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadControlProps extends HTMLArkProps<'div'> {}

export const SignaturePadControl = forwardRef<HTMLDivElement, SignaturePadControlProps>(
  (props, ref) => {
    const signature = useSignaturePadContext()
    const mergedProps = mergeProps(signature.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SignaturePadControl.displayName = 'SignaturePadControl'
