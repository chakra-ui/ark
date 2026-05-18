<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuItemTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemTextProps extends Assign<HTMLProps<'div'>, MenuItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'
  import { useMenuItemPropsContext } from './use-menu-option-item-props-context.ts'

  let { ref = $bindable(null), ...props }: MenuItemTextProps = $props()

  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = $derived(mergeProps(menu().getItemTextProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
