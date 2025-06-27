<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSignaturePadProps } from './use-signature-pad.svelte'

  export interface SignaturePadRootBaseProps extends UseSignaturePadProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SignaturePadRootProps extends Assign<HTMLProps<'div'>, SignaturePadRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSignaturePad } from './use-signature-pad.svelte'
  import { SignaturePadProvider } from './use-signature-pad-context'

  let { ref = $bindable(null), ...props }: SignaturePadRootProps = $props()
  const providedId = $props.id()

  const [useSignaturePadProps, localProps] = $derived(
    createSplitProps<UseSignaturePadProps>()(props, [
      'id',
      'ids',
      'drawing',
      'disabled',
      'readOnly',
      'name',
      'onDraw',
      'onDrawEnd',
      'required',
      'translations',
    ]),
  )

  const resolvedProps = $derived<UseSignaturePadProps>({
    ...useSignaturePadProps,
    id: useSignaturePadProps.id ?? providedId,
  })

  const signaturePad = useSignaturePad(() => resolvedProps)
  const mergedProps = $derived(mergeProps(signaturePad().getRootProps(), localProps))

  SignaturePadProvider(signaturePad)
</script>

<Ark as="div" bind:ref {...mergedProps} />
