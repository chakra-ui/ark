<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuItemIndicatorProps extends Assign<
    HTMLProps<'div'>,
    NavigationMenuItemIndicatorBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

  let { ref = $bindable(null), ...props }: NavigationMenuItemIndicatorProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const itemProps = useNavigationMenuItemPropsContext()

  const mergedProps = $derived(mergeProps(navigationMenu().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
