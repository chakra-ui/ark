<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuItemProps extends Assign<HTMLProps<'div'>, NavigationMenuItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuItemProps = $props()
  const splitItemProps = createSplitProps<ItemProps>()
  const [itemProps, localProps] = $derived(splitItemProps(props, ['disabled', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getItemProps(itemProps), localProps))

  NavigationMenuItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
