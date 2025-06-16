<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuSeparatorBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuSeparatorProps extends Assign<HTMLProps<'div'>, MenuSeparatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  const props: MenuSeparatorProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getSeparatorProps(), props))
</script>

<Ark as="div" data-scope="menu" data-part="separator" {...mergedProps} />
