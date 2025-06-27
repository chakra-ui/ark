<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectContentProps extends Assign<HTMLProps<'div'>, SelectContentBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { mergeProps } from '@zag-js/svelte'
  import { usePresenceContext } from '../presence'
  import { useSelectContext } from './use-select-context'

  let { ref = $bindable(null), ...props }: SelectContentProps = $props()
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(select().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
