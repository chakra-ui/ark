<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemIndicatorProps extends Assign<HTMLProps<'div'>, MenuItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'
  import { useMenuItemPropsContext } from './use-menu-option-item-props-context.ts'

  let { ref = $bindable(null), ...props }: MenuItemIndicatorProps = $props()

  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = $derived(mergeProps(menu().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
