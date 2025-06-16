<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CollapsibleIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface CollapsibleIndicatorProps extends Assign<HTMLProps<'div'>, CollapsibleIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCollapsibleContext } from './use-collapsible-context'

  const props: CollapsibleIndicatorProps = $props()
  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getIndicatorProps(), props))
</script>

<Ark as="div" {...mergedProps} />
