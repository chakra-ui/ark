import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSignaturePadProps, useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

export interface SignaturePadRootProps extends Assign<HTMLArkProps<'div'>, UseSignaturePadProps> {}

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
  ])

  const signaturePad = useSignaturePad(useSignaturePadProps)
  const mergedProps = mergeProps(() => signaturePad().getRootProps(), localProps)

  return (
    <SignaturePadProvider value={signaturePad}>
      <ark.div {...mergedProps} />
    </SignaturePadProvider>
  )
}
