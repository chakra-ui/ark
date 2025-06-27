<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuArrowTipBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuArrowTipProps extends Assign<HTMLProps<'div'>, MenuArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  let { ref = $bindable(), ...props }: MenuArrowTipProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getArrowTipProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
