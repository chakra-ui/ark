<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface DialogCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface DialogCloseTriggerProps extends Assign<HTMLProps<'button'>, DialogCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useDialogContext } from './use-dialog-context'

  const props: DialogCloseTriggerProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps(dialog().getCloseTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
