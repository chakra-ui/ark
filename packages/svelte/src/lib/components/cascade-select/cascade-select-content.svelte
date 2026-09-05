<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CascadeSelectContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectContentProps extends Assign<HTMLProps<'div'>, CascadeSelectContentBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { usePresenceContext } from '../presence'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectContentProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(cascadeSelect().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
