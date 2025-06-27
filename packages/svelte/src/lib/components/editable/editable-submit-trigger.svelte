<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableSubmitTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface EditableSubmitTriggerProps extends Assign<HTMLProps<'button'>, EditableSubmitTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  let { ref = $bindable(null), ...props }: EditableSubmitTriggerProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getSubmitTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
