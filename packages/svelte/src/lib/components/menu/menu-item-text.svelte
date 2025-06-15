<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuItemTextBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuItemTextProps extends Assign<HTMLProps<'div'>, MenuItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuItemPropsContext } from './use-menu-option-item-props-context'

  const props: MenuItemTextProps = $props()

  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = $derived(mergeProps(menu().getItemTextProps(itemProps()), props))
</script>

<Ark as="div" {...mergedProps} />
