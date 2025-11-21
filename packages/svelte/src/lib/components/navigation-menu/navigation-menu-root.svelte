<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePresenceProps } from '../presence'
  import type { UseNavigationMenuProps } from './use-navigation-menu.svelte'

  export interface NavigationMenuRootBaseProps
    extends UseNavigationMenuProps,
      UsePresenceProps,
      PolymorphicProps<'nav'>,
      RefAttribute {}
  export interface NavigationMenuRootProps extends Assign<HTMLProps<'nav'>, NavigationMenuRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { NavigationMenuProvider } from './use-navigation-menu-context'
  import { useNavigationMenu } from './use-navigation-menu.svelte'
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), value = $bindable(), ...props }: NavigationMenuRootProps = $props()

  const providedId = $props.id()

  const [renderStrategyProps, navigationMenuProps] = $derived(splitRenderStrategyProps(props))
  const [useNavigationMenuProps, localProps] = $derived(
    createSplitProps<UseNavigationMenuProps>()(navigationMenuProps, [
      'closeDelay',
      'defaultValue',
      'disableClickTrigger',
      'disableHoverTrigger',
      'disablePointerLeaveClose',
      'id',
      'ids',
      'onValueChange',
      'openDelay',
      'orientation',
      'value',
    ]),
  )

  const machineProps = $derived<UseNavigationMenuProps>({
    ...useNavigationMenuProps,
    id: useNavigationMenuProps.id ?? providedId,
    value,
    onValueChange(details) {
      useNavigationMenuProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const navigationMenu = useNavigationMenu(() => machineProps)
  const mergedProps = $derived(mergeProps(navigationMenu().getRootProps(), localProps))

  RenderStrategyPropsProvider(() => renderStrategyProps)
  NavigationMenuProvider(navigationMenu)
</script>

<Ark as="nav" bind:ref {...mergedProps} />
