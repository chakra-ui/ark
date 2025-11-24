<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuTriggerBaseProps
    extends Omit<ItemProps, 'value'>,
      PolymorphicProps<'button'>,
      RefAttribute {}
  export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { ensure } from '@zag-js/utils'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

  let { ref = $bindable(null), ...props }: NavigationMenuTriggerProps = $props()
  const splitItemProps = createSplitProps<ItemProps>()

  const itemContext = useNavigationMenuItemPropsContext()
  ensure(itemContext, () => 'NavigationMenu.Trigger must be used within NavigationMenu.Item')

  const value = $derived(itemContext().value)
  const disabled = $derived(props.disabled ?? itemContext().disabled)

  const combinedProps = $derived({ ...props, value, disabled })
  const [triggerProps, localProps] = $derived(splitItemProps(combinedProps, ['value', 'disabled']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
