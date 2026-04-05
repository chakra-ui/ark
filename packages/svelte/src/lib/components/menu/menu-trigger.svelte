<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { TriggerProps } from '@zag-js/menu'

  export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

  let { ref = $bindable(null), ...props }: MenuTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const menu = useMenuContext()
  const triggerItemProps = useMenuTriggerItemContext()

  const mergedProps = $derived(mergeProps(menu().getTriggerProps(triggerProps), triggerItemProps?.() || {}, localProps))
</script>

<Ark as="button" bind:ref data-scope="menu" data-part="trigger" {...mergedProps} />
