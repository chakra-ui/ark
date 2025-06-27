<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableAreaBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface EditableAreaProps extends Assign<HTMLProps<'div'>, EditableAreaBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  let { ref = $bindable(null), ...props }: EditableAreaProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getAreaProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
