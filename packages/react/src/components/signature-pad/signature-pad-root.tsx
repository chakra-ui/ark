import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

export interface SignaturePadRootBaseProps extends UseSignaturePadProps, PolymorphicProps {}
export interface SignaturePadRootProps extends HTMLProps<'div'>, SignaturePadRootBaseProps {}

const splitRootProps = createSplitProps<UseSignaturePadProps>()

export const SignaturePadRoot = forwardRef<HTMLDivElement, SignaturePadRootProps>((props, ref) => {
  const [useSignaturePadProps, localProps] = splitRootProps(props, [
    'id',
    'ids',
    'defaultPaths',
    'drawing',
    'disabled',
    'readOnly',
    'name',
    'onDraw',
    'onDrawEnd',
    'paths',
    'readOnly',
    'required',
    'translations',
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
