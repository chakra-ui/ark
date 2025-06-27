<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogBackdropBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    ref?: Element | null
  }
  export interface DialogBackdropProps extends Assign<HTMLProps<'div'>, DialogBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence } from '../presence'
  import { useDialogContext } from './use-dialog-context'

  let { ref = $bindable<Element | null>(), ...props }: DialogBackdropProps = $props()

  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({ ...renderStrategyProps, present: dialog().open }))
  const mergedProps = $derived(mergeProps(dialog().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
