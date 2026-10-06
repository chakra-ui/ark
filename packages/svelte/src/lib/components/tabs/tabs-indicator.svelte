<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TabsIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TabsIndicatorProps extends Assign<HTMLProps<'span'>, TabsIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTabsContext } from './use-tabs-context.ts'

  let { ref = $bindable(null), ...props }: TabsIndicatorProps = $props()
  const tabs = useTabsContext()
  const mergedProps = $derived(mergeProps(tabs().getIndicatorProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
