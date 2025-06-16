<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface DialogPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface DialogPositionerProps extends Assign<HTMLProps<'div'>, DialogPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useDialogContext } from './use-dialog-context'

  const props: DialogPositionerProps = $props()

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(dialog().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
