<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SignaturePadHiddenInputBaseProps extends PolymorphicProps<'input'>, HiddenInputProps, RefAttribute {}
  export interface SignaturePadHiddenInputProps extends Assign<HTMLProps<'input'>, SignaturePadHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useSignaturePadContext } from './use-signature-pad-context.ts'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import type { HiddenInputProps } from '@zag-js/signature-pad'

  let { ref = $bindable(null), ...props }: SignaturePadHiddenInputProps = $props()
  const [hiddenInputProps, localProps] = $derived(createSplitProps<HiddenInputProps>()(props, ['value']))

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getHiddenInputProps(hiddenInputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />
