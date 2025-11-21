<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuTriggerBaseProps extends ItemProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: NavigationMenuTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['disabled', 'value']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
