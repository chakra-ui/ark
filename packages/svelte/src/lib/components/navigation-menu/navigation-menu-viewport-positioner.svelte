<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ViewportProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuViewportPositionerBaseProps
    extends ViewportProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuViewportPositionerProps extends Assign<
    HTMLProps<'div'>,
    NavigationMenuViewportPositionerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { setNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  import type { Snippet } from 'svelte'

  let { ref = $bindable(null), children, ...props }: NavigationMenuViewportPositionerProps & { children?: Snippet } = $props()
  const splitViewportProps = createSplitProps<ViewportProps>()
  const [viewportProps, localProps] = $derived(splitViewportProps(props, ['align']))

  setNavigationMenuViewportPropsContext(() => viewportProps)

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(
    mergeProps(navigationMenu().getViewportPositionerProps(viewportProps), localProps),
  )
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {@render children?.()}
</Ark>
