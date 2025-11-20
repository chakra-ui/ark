<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePresenceProps } from '../presence'
  import type { UseNavigationMenuReturn } from './use-navigation-menu.svelte'

  interface RootProviderProps {
    value: UseNavigationMenuReturn
  }

  export interface NavigationMenuRootProviderBaseProps
    extends RootProviderProps,
      PolymorphicProps<'nav'>,
      UsePresenceProps,
      RefAttribute {}

  export interface NavigationMenuRootProviderProps
    extends Assign<HTMLProps<'nav'>, NavigationMenuRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { NavigationMenuProvider } from './use-navigation-menu-context'
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'

  let { ref = $bindable(null), ...props }: NavigationMenuRootProviderProps = $props()

  const [renderStrategyProps, localProps] = $derived(splitRenderStrategyProps(props))

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), localProps))

  NavigationMenuProvider(() => props.value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="nav" bind:ref {...mergedProps} />
