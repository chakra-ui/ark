<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuItemIndicatorProps extends Assign<HTMLProps<'div'>, MenuItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuItemPropsContext } from './use-menu-option-item-props-context'

  const props: MenuItemIndicatorProps = $props()

  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = $derived(mergeProps(menu().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" {...mergedProps} />
