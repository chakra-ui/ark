<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerPositionerProps extends Assign<HTMLProps<'div'>, DrawerPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useDrawerContext } from './use-drawer-context.ts'

  let { ref = $bindable(null), ...props }: DrawerPositionerProps = $props()

  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(drawer().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
