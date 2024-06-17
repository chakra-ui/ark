import { mergeProps } from '@zag-js/react'
import { type SVGProps, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps {}
export interface SignaturePadSegmentProps
  extends SVGProps<SVGSVGElement>,
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
