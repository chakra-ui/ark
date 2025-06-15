<script module lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence'
  import type { UseMenuProps } from './use-menu.svelte'

  export interface MenuRootBaseProps extends UseMenuProps, UsePresenceProps {
    children?: Snippet
  }
  export interface MenuRootProps extends MenuRootBaseProps {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
  import { MenuProvider, useMenuContext } from './use-menu-context'
  import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
  import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'
  import { useMenu } from './use-menu.svelte'

  let { open = $bindable<boolean>(), ...props }: MenuRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, menuProps] = $derived(splitPresenceProps(props))
  const [useMenuProps, localProps] = $derived(
    createSplitProps<UseMenuProps>()(menuProps, [
      'anchorPoint',
      'aria-label',
      'closeOnSelect',
      'composite',
      'defaultHighlightedValue',
      'defaultOpen',
      'highlightedValue',
      'id',
      'ids',
      'loopFocus',
      'navigate',
      'onEscapeKeyDown',
      'onFocusOutside',
      'onHighlightChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onSelect',
      'open',
      'positioning',
      'typeahead',
    ]),
  )

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()

  const resolvedProps = $derived<UseMenuProps>({
    ...useMenuProps,
    id: useMenuProps.id ?? providedId,
    open,
    onOpenChange(details) {
      useMenuProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
  })

  const menu = useMenu(() => resolvedProps)
  const api = $derived(menu().api)
  const service = $derived(menu().service)

  const presence = usePresence(() => ({
    present: api.open,
    ...presenceProps,
  }))

  // Connect parent-child relationship for nested menus
  onMount(() => {
    const _parentService = parentMachine?.()
    const _parentApi = parentApi?.()

    if (!_parentService || !_parentApi) return

    _parentApi.setChild(service)
    api.setParent(_parentService)
  })

  const triggerItemContext = $derived(parentApi?.().getTriggerItemProps(api))

  MenuTriggerItemProvider(() => triggerItemContext)
  MenuMachineProvider(() => service)
  MenuProvider(() => api)
  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
