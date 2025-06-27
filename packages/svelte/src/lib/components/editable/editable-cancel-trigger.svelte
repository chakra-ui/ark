<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableCancelTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface EditableCancelTriggerProps extends Assign<HTMLProps<'button'>, EditableCancelTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  let { ref = $bindable(), ...props }: EditableCancelTriggerProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getCancelTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
