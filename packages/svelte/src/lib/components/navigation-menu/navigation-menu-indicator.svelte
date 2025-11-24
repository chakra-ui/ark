<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuIndicatorProps extends Assign<HTMLProps<'div'>, NavigationMenuIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence } from '../presence'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'

  let { ref = $bindable(null), ...props }: NavigationMenuIndicatorProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence(() => ({ ...renderStrategyProps, present: navigationMenu().open }))
  const mergedProps = $derived(mergeProps(navigationMenu().getIndicatorProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
