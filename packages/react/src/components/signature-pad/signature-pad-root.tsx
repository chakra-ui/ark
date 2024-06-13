import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

export interface SignaturePadRootBaseProps extends UseSignaturePadProps {}
export interface SignaturePadRootProps
  extends Assign<HTMLArkProps<'div'>, SignaturePadRootBaseProps> {}
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
