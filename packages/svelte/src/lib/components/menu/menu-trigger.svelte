<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

  const props: MenuTriggerProps = $props()

  const menu = useMenuContext()
  const triggerItemProps = useMenuTriggerItemContext()

  const mergedProps = $derived(mergeProps(menu().getTriggerProps(), triggerItemProps?.() || {}, props))
</script>

<Ark as="button" data-scope="menu" data-part="trigger" {...mergedProps}>
  <slot />
</Ark>
