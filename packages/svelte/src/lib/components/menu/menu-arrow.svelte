<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuArrowBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuArrowProps extends Assign<HTMLProps<'div'>, MenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  const props: MenuArrowProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getArrowProps(), props))
</script>

<Ark as="div" {...mergedProps} />
