<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SignaturePadControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SignaturePadControlProps extends Assign<HTMLProps<'div'>, SignaturePadControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { useSignaturePadContext } from './use-signature-pad-context.ts'

  let { ref = $bindable(null), ...props }: SignaturePadControlProps = $props()

  const signaturePad = useSignaturePadContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(signaturePad().getControlProps(), props))
</script>

<Ark as="div" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
