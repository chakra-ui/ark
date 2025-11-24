<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ViewportProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuViewportPositionerBaseProps
    extends ViewportProps,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface NavigationMenuViewportPositionerProps
    extends Assign<HTMLProps<'div'>, NavigationMenuViewportPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuViewportPositionerProps = $props()
  const splitViewportProps = createSplitProps<ViewportProps>()
  const [viewportPositionerProps, localProps] = $derived(splitViewportProps(props, ['align']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(
    mergeProps(navigationMenu().getViewportPositionerProps(viewportPositionerProps), localProps),
  )
</script>

<Ark as="div" bind:ref {...mergedProps} />
