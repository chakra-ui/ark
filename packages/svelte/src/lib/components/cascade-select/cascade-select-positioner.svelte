<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectPositionerProps
    extends Assign<HTMLProps<'div'>, CascadeSelectPositionerBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { usePresenceContext } from '../presence'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectPositionerProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
