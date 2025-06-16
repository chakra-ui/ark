<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface EditableInputBaseProps extends PolymorphicProps<'input'> {}
  export interface EditableInputProps extends Assign<HTMLProps<'input'>, EditableInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  const props: EditableInputProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />
