<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuListProps extends Assign<HTMLProps<'div'>, MenuListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuListProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
