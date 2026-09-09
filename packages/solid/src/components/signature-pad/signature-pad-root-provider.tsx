import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseSignaturePadReturn } from './use-signature-pad.ts'
import { SignaturePadProvider } from './use-signature-pad-context.ts'
import type { RootState } from '@zag-js/signature-pad'

interface RootProviderProps {
  value: UseSignaturePadReturn
}

export interface SignaturePadRootProviderState extends RootState {}

export interface SignaturePadRootProviderBaseProps extends PolymorphicProps<'div', SignaturePadRootProviderState> {}
export interface SignaturePadRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, SignaturePadRootProviderBaseProps {}

export const SignaturePadRootProvider = (props: SignaturePadRootProviderProps) => {
  const [{ value: signaturePad }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => signaturePad().getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} state={signaturePad().getRootState()} />
    </SignaturePadProvider>
  )
}
