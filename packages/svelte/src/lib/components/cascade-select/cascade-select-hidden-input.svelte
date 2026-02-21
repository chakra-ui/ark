<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface CascadeSelectHiddenInputProps
    extends Assign<HTMLProps<'input'>, CascadeSelectHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectHiddenInputProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
