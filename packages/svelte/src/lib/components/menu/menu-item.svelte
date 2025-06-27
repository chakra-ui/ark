<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  interface ItemBaseProps extends ItemProps {
    /**
     * The function to call when the item is selected
     */
    onSelect?: VoidFunction
  }

  export interface MenuItemBaseProps extends ItemBaseProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemProps extends Assign<HTMLProps<'div'>, MenuItemBaseProps> {}
</script>

<script lang="ts">
  import type { ItemProps } from '@zag-js/menu'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { MenuItemProvider } from './use-menu-item-context'
  import { MenuItemPropsProvider } from './use-menu-option-item-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: MenuItemProps = $props()

  const [itemProps, localProps] = $derived(
    createSplitProps<ItemBaseProps>()(props, ['closeOnSelect', 'disabled', 'value', 'valueText', 'onSelect']),
  )

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getItemProps(itemProps), localProps))
  const itemState = $derived(menu().getItemState(itemProps))

  $effect(() => {
    return menu().addItemListener({
      id: itemState.id,
      onSelect: itemProps.onSelect,
    })
  })

  MenuItemPropsProvider(() => itemProps)
  MenuItemProvider(() => itemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
