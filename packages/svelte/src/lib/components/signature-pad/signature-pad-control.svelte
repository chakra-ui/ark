<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SignaturePadControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SignaturePadControlProps extends Assign<HTMLProps<'div'>, SignaturePadControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'

  let { ref = $bindable(null), ...props }: SignaturePadControlProps = $props()

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
