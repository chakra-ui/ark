import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseSignaturePadReturn } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

interface RootProviderProps {
  value: UseSignaturePadReturn
}

export interface SignaturePadRootProviderBaseProps extends RootProviderProps {}
export interface SignaturePadRootProviderProps
  extends HTMLArkProps<'div'>,
    SignaturePadRootProviderBaseProps {}

export const SignaturePadRootProvider = forwardRef<HTMLDivElement, SignaturePadRootProviderProps>(
  (props, ref) => {
    const [{ value: signaturePad }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(signaturePad.getRootProps(), localProps)

    return (
      <SignaturePadProvider value={signaturePad}>
        <ark.div {...mergedProps} ref={ref} />
      </SignaturePadProvider>
    )
  },
)

SignaturePadRootProvider.displayName = 'SignaturePadRootProvider'
