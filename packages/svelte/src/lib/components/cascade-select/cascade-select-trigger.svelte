<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CascadeSelectTriggerProps extends Assign<HTMLProps<'button'>, CascadeSelectTriggerBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectTriggerProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
