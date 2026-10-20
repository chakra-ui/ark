<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CascadeSelectClearTriggerProps extends Assign<
    HTMLProps<'button'>,
    CascadeSelectClearTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectClearTriggerProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
