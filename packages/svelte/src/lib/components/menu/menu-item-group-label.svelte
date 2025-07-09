<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuItemGroupLabelBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemGroupLabelProps extends Assign<HTMLProps<'div'>, MenuItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuItemGroupContext } from './use-menu-item-group-context'

  let { ref = $bindable(null), ...props }: MenuItemGroupLabelProps = $props()

  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()
  const mergedProps = $derived(mergeProps(menu().getItemGroupLabelProps({ htmlFor: itemGroup().id }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
