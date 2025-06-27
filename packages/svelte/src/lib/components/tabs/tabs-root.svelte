<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseTabsProps } from './use-tabs.svelte'

  export interface TabsRootBaseProps extends UseTabsProps, RenderStrategyProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsRootProps extends Assign<HTMLProps<'div'>, TabsRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import {
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
    type RenderStrategyProps,
  } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TabsProvider } from './use-tabs-context'
  import { useTabs } from './use-tabs.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: TabsRootProps = $props()

  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)

  const id = $props.id()

  const [useTabsProps, localProps] = $derived.by(() => {
    const props = { ...tabsProps, value }
    return createSplitProps<UseTabsProps>()(props, [
      'value',
      'onValueChange',
      'onFocusChange',
      'orientation',
      'activationMode',
      'id',
      'ids',
      'loopFocus',
      'translations',
      'defaultValue',
      'composite',
      'deselectable',
      'navigate',
    ])
  })

  const machineProps = $derived.by<UseTabsProps>(() => ({
    ...useTabsProps,
    id: useTabsProps.id ?? id,
    value,
    onValueChange(details) {
      useTabsProps.onValueChange?.(details)
      value = details.value
    },
  }))

  const tabs = useTabs(() => machineProps)
  const mergedProps = $derived(mergeProps(tabs().getRootProps(), localProps))

  TabsProvider(tabs)
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
