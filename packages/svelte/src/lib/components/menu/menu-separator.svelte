<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuSeparatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuSeparatorProps extends Assign<HTMLProps<'div'>, MenuSeparatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  let { ref = $bindable(null), ...props }: MenuSeparatorProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getSeparatorProps(), props))
</script>

<Ark as="div" bind:ref data-scope="menu" data-part="separator" {...mergedProps} />
