<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SignaturePadGuideBaseProps extends PolymorphicProps<'div'> {}
  export interface SignaturePadGuideProps extends Assign<HTMLProps<'div'>, SignaturePadGuideBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePadContext } from './use-signature-pad-context'

  const props: SignaturePadGuideProps = $props()

  const signaturePad = useSignaturePadContext()
  const mergedProps = $derived(mergeProps(signaturePad().getGuideProps(), props))
</script>

<Ark as="div" {...mergedProps} />
