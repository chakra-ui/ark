<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface EditableControlProps extends Assign<HTMLProps<'div'>, EditableControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  let { ref = $bindable(null), ...props }: EditableControlProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
