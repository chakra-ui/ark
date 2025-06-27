<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuArrowProps extends Assign<HTMLProps<'div'>, MenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  let { ref = $bindable(), ...props }: MenuArrowProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
