<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectIndicatorProps extends Assign<HTMLProps<'div'>, CascadeSelectIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectIndicatorProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
