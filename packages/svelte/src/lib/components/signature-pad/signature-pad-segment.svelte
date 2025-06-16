<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SignaturePadSegmentBaseProps extends PolymorphicProps<'svg'> {}
  export interface SignaturePadSegmentProps extends Assign<HTMLProps<'svg'>, SignaturePadSegmentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'

  const props: SignaturePadSegmentProps = $props()

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getSegmentProps(), props))

  const currentPath = $derived(signaturePad().currentPath)
</script>

<Ark as="svg" {...mergedProps}>
  <title>Signature</title>
  {#each signaturePad().paths as path, i}
    <path {...signaturePad().getSegmentPathProps({ path })} />
  {/each}
  {#if currentPath}
    <path {...signaturePad().getSegmentPathProps({ path: currentPath })} />
  {/if}
</Ark>
