import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

export interface SignaturePadRootBaseProps extends UseSignaturePadProps, PolymorphicProps {}
export interface SignaturePadRootProps
  extends HTMLAttributes<HTMLDivElement>,
    SignaturePadRootBaseProps {}
export const SignaturePadRoot = forwardRef<HTMLDivElement, SignaturePadRootProps>((props, ref) => {
  const [useSignaturePadProps, localProps] = createSplitProps<UseSignaturePadProps>()(props, [
    'id',
    'ids',
    'drawing',
    'disabled',
    'readOnly',
    'name',
    'onDraw',
    'onDrawEnd',
  ])
  const signaturePad = useSignaturePad(useSignaturePadProps)
  const mergedProps = mergeProps(signaturePad.getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} ref={ref} />
    </SignaturePadProvider>
  )
})

SignaturePadRoot.displayName = 'SignaturePadRoot'
