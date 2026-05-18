<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuViewportBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuViewportProps extends Assign<HTMLProps<'div'>, NavigationMenuViewportBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresence } from '../presence/index.ts'
  import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
  import { getNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context.ts'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'

  let { ref = $bindable(null), ...props }: NavigationMenuViewportProps = $props()

  const viewportPropsContext = getNavigationMenuViewportPropsContext()

  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence(() => ({ ...renderStrategyProps(), present: navigationMenu().open }))
  const mergedProps = $derived(
    mergeProps(navigationMenu().getViewportProps(viewportPropsContext?.()), presence().getPresenceProps(), props),
  )

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
