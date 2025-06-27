<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SignaturePadLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface SignaturePadLabelProps extends Assign<HTMLProps<'label'>, SignaturePadLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'

  let { ref = $bindable(), ...props }: SignaturePadLabelProps = $props()

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
