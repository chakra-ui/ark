<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DialogContentBaseProps extends PolymorphicProps<'div'> {
    ref?: Element | null
  }
  export interface DialogContentProps extends Assign<HTMLProps<'div'>, DialogContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useDialogContext } from './use-dialog-context'

  let { ref = $bindable(null), ...props }: DialogContentProps = $props()

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(dialog().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
