<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableEditTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface EditableEditTriggerProps extends Assign<HTMLProps<'button'>, EditableEditTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  let { ref = $bindable(), ...props }: EditableEditTriggerProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getEditTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} /> 
