<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { LinkProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuContentBaseProps
    extends Omit<LinkProps, 'value'>,
      PolymorphicProps<'div'>,
      RefAttribute {
    value?: LinkProps['value']
  }
  export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import type { RequiredBy } from '@zag-js/types'
  import { Ark } from '../factory'
  import { Portal } from '../portal'
  import { usePresence } from '../presence'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

  let { ref = $bindable(null), ...props }: NavigationMenuContentProps = $props()

  const splitLinkProps = createSplitProps<LinkProps>()

  const navigationMenu = useNavigationMenuContext()
  const itemContext = useNavigationMenuItemPropsContext()

  const value = $derived(props.value ?? itemContext()?.value)

  const combinedProps = $derived(mergeProps(props, { value }) as RequiredBy<NavigationMenuContentProps, 'value'>)
  const [contentProps, localProps] = $derived(splitLinkProps(combinedProps, ['value', 'current', 'onSelect']))

  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({
    ...renderStrategyProps,
    present: navigationMenu().value === value,
  }))

  const mergedProps = $derived(
    mergeProps(navigationMenu().getContentProps(contentProps), presence().getPresenceProps(), localProps),
  )

  const viewportNode = $derived(navigationMenu().getViewportNode())

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if navigationMenu().isViewportRendered && viewportNode}
  <div {...navigationMenu().getViewportProxyProps(contentProps)}></div>
  <div {...navigationMenu().getTriggerProxyProps(contentProps)}></div>
  <Portal container={viewportNode}>
    {#if !presence().unmounted}
      <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
    {/if}
  </Portal>
{:else if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
