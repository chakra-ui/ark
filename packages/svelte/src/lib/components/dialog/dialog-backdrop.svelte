<script module lang="ts">
  import type { BackdropState } from '@zag-js/dialog'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogBackdropState extends BackdropState {}
  export interface DialogBackdropBaseProps extends PolymorphicProps<'div', DialogBackdropState>, RefAttribute {
    ref?: Element | null
  }
  export interface DialogBackdropProps extends Assign<HTMLProps<'div'>, DialogBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresence } from '../presence/index.ts'
  import { useDialogContext } from './use-dialog-context.ts'

  let { ref = $bindable(null), ...props }: DialogBackdropProps = $props()

  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({ ...renderStrategyProps(), present: dialog().open }))
  const mergedProps = $derived(mergeProps(dialog().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} state={dialog().getBackdropState()} />
{/if}
