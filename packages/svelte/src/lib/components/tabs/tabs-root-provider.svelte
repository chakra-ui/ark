<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseTabsReturn } from './use-tabs.svelte'

  interface RootProviderProps {
    value: UseTabsReturn
  }

  export interface TabsRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RenderStrategyProps {}
  export interface TabsRootProviderProps extends Assign<HTMLProps<'div'>, TabsRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { TabsProvider } from './use-tabs-context'
  import {
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
    type RenderStrategyProps,
  } from '$lib/utils/render-strategy'

  const props: TabsRootProviderProps = $props()

  const [renderStrategyProps, tabsProps] = $derived(splitRenderStrategyProps(props))
  const [rootProviderProps, localProps] = $derived(createSplitProps<RootProviderProps>()(tabsProps, ['value']))

  const mergedProps = $derived(mergeProps(rootProviderProps.value().getRootProps(), localProps))

  TabsProvider(() => rootProviderProps.value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" {...mergedProps} />
