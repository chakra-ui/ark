<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TabsListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsListProps extends Assign<HTMLProps<'div'>, TabsListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTabsContext } from './use-tabs-context'

  let { ref = $bindable(), ...props }: TabsListProps = $props()
  const tabs = useTabsContext()

  const mergedProps = $derived(mergeProps(tabs().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
