<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ContentProps } from '@zag-js/tabs'

  export interface TabsContentBaseProps extends ContentProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsContentProps extends Assign<HTMLProps<'div'>, TabsContentBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
  import { useTabsContext } from './use-tabs-context'

  let { ref = $bindable(), ...props }: TabsContentProps = $props()
  const [contentProps, localProps] = createSplitProps<ContentProps>()(props, ['value'])

  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const machineProps = $derived.by<UsePresenceProps>(() => ({
    ...renderStrategyProps,
    present: tabs().value === contentProps.value,
    immediate: true,
  }))

  const presence = usePresence(() => machineProps)

  const mergedProps = $derived(mergeProps(tabs().getContentProps(contentProps), localProps))

  PresenceProvider(presence)

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
