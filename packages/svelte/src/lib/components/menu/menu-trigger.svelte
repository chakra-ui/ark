<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { TriggerProps, TriggerState } from '@zag-js/menu'

  export interface MenuTriggerState extends TriggerState {}
  export interface MenuTriggerBaseProps
    extends TriggerProps, PolymorphicProps<'button', MenuTriggerState>, RefAttribute {}
  export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context.ts'

  let { ref = $bindable(null), ...props }: MenuTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const menu = useMenuContext()
  const triggerItemProps = useMenuTriggerItemContext()

  const mergedProps = $derived(mergeProps(menu().getTriggerProps(triggerProps), triggerItemProps?.() || {}, localProps))
</script>

<Ark
  as="button"
  bind:ref
  {...mergedProps}
  state={menu().getTriggerState(triggerProps)}
/>
