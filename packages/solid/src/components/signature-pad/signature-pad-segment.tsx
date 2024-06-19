import { mergeProps } from '@zag-js/solid'
import { For, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps<'svg'> {}
export interface SignaturePadSegmentProps extends HTMLProps<'svg'>, SignaturePadSegmentBaseProps {}

export const SignaturePadSegment = (props: SignaturePadSegmentProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getSegmentProps(), props)

  return (
    <ark.svg {...mergedProps}>
      <title>Signature</title>
      <For each={signaturePad().paths}>
        {(path) => <path {...signaturePad().getSegmentPathProps({ path })} />}
      </For>
      <Show when={signaturePad().currentPath}>
        {/* @ts-expect-error */}
        <path {...signaturePad().getSegmentPathProps({ path: signaturePad().currentPath })} />
      </Show>
    </ark.svg>
  )
}
