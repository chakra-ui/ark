<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TabsIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsIndicatorProps extends Assign<HTMLProps<'div'>, TabsIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTabsContext } from './use-tabs-context'

  let { ref = $bindable(null), ...props }: TabsIndicatorProps = $props()
  const tabs = useTabsContext()
  const mergedProps = $derived(mergeProps(tabs().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
