<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { LinkProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuContentBaseProps extends LinkProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PresenceProvider, usePresence, usePresenceContext, type UsePresenceProps } from '../presence'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuContentProps = $props()
  const [contentProps, localProps] = $derived(createSplitProps<LinkProps>()(props, ['value', 'current', 'onSelect']))

  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({
    ...renderStrategyProps,
    present: navigationMenu().value === contentProps.value,
  }))

  const mergedProps = $derived(
    mergeProps(navigationMenu().getContentProps(contentProps), presence().getPresenceProps(), localProps),
  )

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
