<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SignaturePadHiddenInputBaseProps extends PolymorphicProps<'input'>, HiddenInputProps {}
  export interface SignaturePadHiddenInputProps extends Assign<HTMLProps<'input'>, SignaturePadHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import type { HiddenInputProps } from '@zag-js/signature-pad'

  const props: SignaturePadHiddenInputProps = $props()
  const [hiddenInputProps, localProps] = createSplitProps<HiddenInputProps>()(props, ['value'])

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getHiddenInputProps(hiddenInputProps), localProps))
</script>

<Ark as="input" {...mergedProps} />
