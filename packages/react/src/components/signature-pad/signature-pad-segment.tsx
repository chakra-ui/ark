import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'

import { type HTMLArkProps, ark } from '../factory'
import { SignaturePadSegmentPath } from './signature-pad-segment-path'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadSegmentProps extends HTMLArkProps<'svg'> {}

export const SignaturePadSegment = forwardRef<SVGSVGElement, SignaturePadSegmentProps>(
  (props, ref) => {
    const signature = useSignaturePadContext()
    const mergedProps = mergeProps(signature.getSegmentProps(), props)

    return (
      <ark.svg {...mergedProps} ref={ref}>
        <title>Signature pad segment</title>
        {signature.paths.map((path, i) => (
          <SignaturePadSegmentPath key={i} path={path} />
        ))}
        {signature.currentPath && <SignaturePadSegmentPath path={signature.currentPath} />}
      </ark.svg>
    )
  },
)

SignaturePadSegment.displayName = 'SignaturePadSegment'
