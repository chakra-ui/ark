import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad.ts'
import { SignaturePadProvider } from './use-signature-pad-context.ts'
import type { RootState } from '@zag-js/signature-pad'

export interface SignaturePadRootState extends RootState {}

export interface SignaturePadRootBaseProps
  extends UseSignaturePadProps, PolymorphicProps<'div', SignaturePadRootState> {}
export interface SignaturePadRootProps extends HTMLProps<'div'>, SignaturePadRootBaseProps {}

export const SignaturePadRoot = (props: SignaturePadRootProps) => {
  const [useSignaturePadProps, localProps] = createSplitProps<UseSignaturePadProps>()(props, [
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
  const mergedProps = mergeProps(() => signaturePad().getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} state={signaturePad().getRootState()} />
    </SignaturePadProvider>
  )
}
