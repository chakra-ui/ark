<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { LinkProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuLinkBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps<'a'>, RefAttribute {
    value?: LinkProps['value']
  }
  export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import type { RequiredBy } from '@zag-js/types'

  let { ref = $bindable(null), ...props }: NavigationMenuLinkProps = $props()

  const itemContext = useNavigationMenuItemPropsContext()
  const value = $derived(props.value ?? itemContext?.()?.value)
  const combinedProps = $derived(mergeProps(props, { value }) as RequiredBy<NavigationMenuLinkProps, 'value'>)

  const splitLinkProps = createSplitProps<LinkProps>()
  const [linkProps, localProps] = $derived(splitLinkProps(combinedProps, ['current', 'onSelect', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getLinkProps(linkProps), localProps))
</script>

<Ark as="a" bind:ref {...mergedProps} />
