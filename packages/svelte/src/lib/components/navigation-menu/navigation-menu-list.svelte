<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuListProps extends Assign<HTMLProps<'div'>, NavigationMenuListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'

  let { ref = $bindable(null), ...props }: NavigationMenuListProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
