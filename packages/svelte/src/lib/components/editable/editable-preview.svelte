<script module lang="ts">
  import type { PreviewState } from '@zag-js/editable'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditablePreviewState extends PreviewState {}
  export interface EditablePreviewBaseProps extends PolymorphicProps<'span', EditablePreviewState>, RefAttribute {}
  export interface EditablePreviewProps extends Assign<HTMLProps<'span'>, EditablePreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditablePreviewProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getPreviewProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} state={editable().getPreviewState()}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {editable().valueText}
  {/if}
</Ark>
