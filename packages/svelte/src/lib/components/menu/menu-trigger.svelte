<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

  let { ref = $bindable(null), ...props }: MenuTriggerProps = $props()

  const menu = useMenuContext()
  const triggerItemProps = useMenuTriggerItemContext()

  const mergedProps = $derived(mergeProps(menu().getTriggerProps(), triggerItemProps?.() || {}, props))
</script>

<Ark as="button" bind:ref data-scope="menu" data-part="trigger" {...mergedProps} />
