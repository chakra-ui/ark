<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface SignaturePadClearTriggerProps extends Assign<
    HTMLProps<'button'>,
    SignaturePadClearTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'

  let { ref = $bindable(null), ...props }: SignaturePadClearTriggerProps = $props()

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
