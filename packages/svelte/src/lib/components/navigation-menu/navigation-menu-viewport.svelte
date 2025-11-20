<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ViewportProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuViewportBaseProps extends ViewportProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuViewportProps extends Assign<HTMLProps<'div'>, NavigationMenuViewportBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence, usePresenceContext } from '../presence'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuViewportProps = $props()
  const [viewportProps, localProps] = $derived(createSplitProps<ViewportProps>()(props, ['align']))

  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence(() => ({ ...renderStrategyProps, present: navigationMenu().open }))
  const mergedProps = $derived(
    mergeProps(navigationMenu().getViewportProps(viewportProps), presence().getPresenceProps(), localProps),
  )

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
