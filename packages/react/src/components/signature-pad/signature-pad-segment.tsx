import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'

import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadSegmentProps extends HTMLArkProps<'svg'> {}

export const SignaturePadSegment = forwardRef<SVGSVGElement, SignaturePadSegmentProps>(
  (props, ref) => {
    const signature = useSignaturePadContext()
    const mergedProps = mergeProps(signature.segmentProps, props)

    return (
      <ark.svg {...mergedProps} ref={ref}>
        <title>Signature pad segment</title>
        {signature.paths.map((path, i) => (
          <ark.path key={i} {...signature.getSegmentPathProps({ path })} />
        ))}
        {signature.currentPath && (
          <ark.path {...signature.getSegmentPathProps({ path: signature.currentPath })} />
        )}
      </ark.svg>
    )
  },
)

SignaturePadSegment.displayName = 'SignaturePadSegment'
