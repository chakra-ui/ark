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
    // biome-ignore lint/a11y/noSvgWithoutTitle: <ark.title> is used here
    <ark.svg {...mergedProps}>
      <ark.title>Signature</ark.title>
      <For each={signaturePad().paths}>{(path) => <ark.path {...signaturePad().getSegmentPathProps({ path })} />}</For>
      <Show when={signaturePad().currentPath}>
        {/* @ts-expect-error */}
        <ark.path {...signaturePad().getSegmentPathProps({ path: signaturePad().currentPath })} />
      </Show>
    </ark.svg>
  )
}
