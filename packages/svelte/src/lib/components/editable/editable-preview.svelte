<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface EditablePreviewBaseProps extends PolymorphicProps<'span'> {}
  export interface EditablePreviewProps extends Assign<HTMLProps<'span'>, EditablePreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useEditableContext } from './use-editable-context'

  const props: EditablePreviewProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getPreviewProps(), props))
</script>

<Ark as="span" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {editable().valueText}
  {/if}
</Ark>
