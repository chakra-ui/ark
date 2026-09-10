<script module lang="ts">
  import type { LabelState } from '@zag-js/editable'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableLabelState extends LabelState {}
  export interface EditableLabelBaseProps extends PolymorphicProps<'label', EditableLabelState>, RefAttribute {}
  export interface EditableLabelProps extends Assign<HTMLProps<'label'>, EditableLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditableLabelProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} state={editable().getLabelState()} />
