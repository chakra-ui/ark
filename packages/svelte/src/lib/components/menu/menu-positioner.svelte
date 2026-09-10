<script module lang="ts">
  import type { PositionerState } from '@zag-js/menu'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuPositionerState extends PositionerState {}
  export interface MenuPositionerBaseProps extends PolymorphicProps<'div', MenuPositionerState>, RefAttribute {}
  export interface MenuPositionerProps extends Assign<HTMLProps<'div'>, MenuPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuPositionerProps = $props()

  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(menu().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} state={menu().getPositionerState()} />
{/if}
