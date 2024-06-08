import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'

import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadSegmentPathProps extends HTMLArkProps<'path'> {
  path: string
}

export const SignaturePadSegmentPath = forwardRef<SVGPathElement, SignaturePadSegmentPathProps>(
  (props, ref) => {
    const signature = useSignaturePadContext()
    const mergedProps = mergeProps(signature.getSegmentPathProps(props), props)

    return <ark.path {...mergedProps} ref={ref} />
  },
)

SignaturePadSegmentPath.displayName = 'SignaturePadSegmentPath'
