import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export type SignaturePadSegmentBaseProps = {}
export interface SignaturePadSegmentProps
  extends HTMLArkProps<'svg'>,
    SignaturePadSegmentBaseProps {}

export const SignaturePadSegment = forwardRef<SVGSVGElement, SignaturePadSegmentProps>(
  (props, ref) => {
    const signaturePad = useSignaturePadContext()
    const mergedProps = mergeProps(signaturePad.getSegmentProps(), props)

    return (
      <ark.svg {...mergedProps} ref={ref}>
        <title>Signature</title>
        {signaturePad.paths.map((path, i) => (
          <path key={i} {...signaturePad.getSegmentPathProps({ path })} />
        ))}
        {signaturePad.currentPath && (
          <path {...signaturePad.getSegmentPathProps({ path: signaturePad.currentPath })} />
        )}
      </ark.svg>
    )
  },
)

SignaturePadSegment.displayName = 'SignaturePadSegment'
