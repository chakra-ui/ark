<script module lang="ts">
  import type { PositionerState } from '@zag-js/dialog'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogPositionerState extends PositionerState {}
  export interface DialogPositionerBaseProps extends PolymorphicProps<'div', DialogPositionerState>, RefAttribute {}
  export interface DialogPositionerProps extends Assign<HTMLProps<'div'>, DialogPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useDialogContext } from './use-dialog-context.ts'

  let { ref = $bindable(null), ...props }: DialogPositionerProps = $props()

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(dialog().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} state={dialog().getPositionerState()} />
{/if}
