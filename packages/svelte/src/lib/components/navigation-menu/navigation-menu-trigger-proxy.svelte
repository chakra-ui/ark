<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/navigation-menu'

  export interface NavigationMenuTriggerProxyBaseProps
    extends Omit<ItemProps, 'value'>,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface NavigationMenuTriggerProxyProps
    extends Assign<HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { ensure } from '@zag-js/utils'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'
  import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

  let { ref = $bindable(null), ...props }: NavigationMenuTriggerProxyProps = $props()

  const itemContext = useNavigationMenuItemPropsContext()
  ensure(itemContext, () => 'NavigationMenu.TriggerProxy must be used within NavigationMenu.Item')

  const value = $derived(itemContext().value)
  const disabled = $derived(props.disabled ?? itemContext().disabled)

  const combinedProps = $derived({ ...props, value, disabled })

  const splitItemProps = createSplitProps<ItemProps>()
  const [triggerProxyProps, localProps] = $derived(splitItemProps(combinedProps, ['value', 'disabled']))

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getTriggerProxyProps(triggerProxyProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
