<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CollapsibleIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CollapsibleIndicatorProps extends Assign<HTMLProps<'div'>, CollapsibleIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCollapsibleContext } from './use-collapsible-context'

  let { ref = $bindable(null), ...props }: CollapsibleIndicatorProps = $props()
  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
