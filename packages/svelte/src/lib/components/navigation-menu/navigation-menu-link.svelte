<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { LinkProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuLinkBaseProps extends LinkProps, PolymorphicProps<'a'>, RefAttribute {}
  export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuLinkProps = $props()
  const [linkProps, localProps] = $derived(createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getLinkProps(linkProps), localProps))
</script>

<Ark as="a" bind:ref {...mergedProps} />
