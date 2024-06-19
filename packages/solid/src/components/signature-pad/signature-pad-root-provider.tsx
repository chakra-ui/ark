import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSignaturePadReturn } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

interface RootProviderProps {
  value: UseSignaturePadReturn
}

export interface SignaturePadRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    SignaturePadRootProviderBaseProps {}

export const SignaturePadRootProvider = (props: SignaturePadRootProviderProps) => {
  const [{ value: signaturePad }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => signaturePad().getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} />
    </SignaturePadProvider>
  )
}
