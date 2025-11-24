<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuViewportProxyBaseProps
    extends Omit<ItemProps, 'value'>,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface NavigationMenuViewportProxyProps
    extends Assign<HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { ensure } from '@zag-js/utils'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

  let { ref = $bindable(null), ...props }: NavigationMenuViewportProxyProps = $props()
  const splitItemProps = createSplitProps<ItemProps>()

  const itemContext = useNavigationMenuItemPropsContext()
  ensure(itemContext, () => 'NavigationMenu.ViewportProxy must be used within NavigationMenu.Item')

  const value = $derived(itemContext().value)
  const disabled = $derived(props.disabled ?? itemContext().disabled)

  const combinedProps = $derived({ ...props, value, disabled })
  const [viewportProxyProps, localProps] = $derived(splitItemProps(combinedProps, ['disabled', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getViewportProxyProps(viewportProxyProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
