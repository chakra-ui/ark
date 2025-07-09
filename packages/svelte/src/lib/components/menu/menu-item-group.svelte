<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemGroupProps } from '@zag-js/menu'

  type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

  export interface MenuItemGroupBaseProps extends OptionalItemGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemGroupProps extends Assign<HTMLProps<'div'>, MenuItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { MenuItemGroupProvider } from './use-menu-item-group-context'

  let { ref = $bindable(null), ...props }: MenuItemGroupProps = $props()

  const menu = useMenuContext()
  const id = $props.id()
  const itemGroupProps = $derived({ id, ...props })
  const mergedProps = $derived(mergeProps(menu().getItemGroupProps(itemGroupProps), props))

  MenuItemGroupProvider(() => itemGroupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
