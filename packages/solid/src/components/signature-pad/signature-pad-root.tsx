import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

export interface SignaturePadRootBaseProps extends UseSignaturePadProps, PolymorphicProps<'div'> {}
export interface SignaturePadRootProps extends HTMLProps<'div'>, SignaturePadRootBaseProps {}

export const SignaturePadRoot = (props: SignaturePadRootProps) => {
  const [useSignaturePadProps, localProps] = createSplitProps<UseSignaturePadProps>()(props, [
    'id',
    'ids',
    'drawing',
    'disabled',
    'readOnly',
    'name',
    'onDraw',
    'onDrawEnd',
    'readOnly',
    'required',
    'translations',
  ])

  const signaturePad = useSignaturePad(useSignaturePadProps)
  const mergedProps = mergeProps(() => signaturePad().getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} />
    </SignaturePadProvider>
  )
}
