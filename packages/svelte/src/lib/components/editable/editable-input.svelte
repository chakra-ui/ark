<script module lang="ts">
  import type { InputState } from '@zag-js/editable'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableInputState extends InputState {}
  export interface EditableInputBaseProps extends PolymorphicProps<'input', EditableInputState>, RefAttribute {}
  export interface EditableInputProps extends Assign<HTMLProps<'input'>, EditableInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditableInputProps = $props()

  const editable = useEditableContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(editable().getInputProps(), props))
</script>

<Ark
  as="input"
  bind:ref
  aria-describedby={field?.()?.ariaDescribedby}
  {...mergedProps}
  state={editable().getInputState()}
/>
