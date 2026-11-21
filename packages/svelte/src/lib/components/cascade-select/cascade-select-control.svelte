<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectControlProps extends Assign<HTMLProps<'div'>, CascadeSelectControlBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectControlProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
