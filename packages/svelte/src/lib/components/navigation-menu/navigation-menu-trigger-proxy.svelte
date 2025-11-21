<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuTriggerProxyBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuTriggerProxyProps
    extends Assign<HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuTriggerProxyProps = $props()
  const [triggerProxyProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['disabled', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getTriggerProxyProps(triggerProxyProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
