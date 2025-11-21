<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuViewportProxyBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuViewportProxyProps
    extends Assign<HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuViewportProxyProps = $props()
  const [viewportProxyProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['disabled', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getViewportProxyProps(viewportProxyProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
