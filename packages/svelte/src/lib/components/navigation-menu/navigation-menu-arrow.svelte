<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuArrowProps extends Assign<HTMLProps<'div'>, NavigationMenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'

  let { ref = $bindable(null), ...props }: NavigationMenuArrowProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
