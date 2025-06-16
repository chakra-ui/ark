<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FieldTextareaBaseProps extends PolymorphicProps<'textarea'> {
    /**
     * Whether the textarea should autoresize
     * @default false
     */
    autoresize?: boolean
  }
  export interface FieldTextareaProps extends Assign<HTMLProps<'textarea'>, FieldTextareaBaseProps> {}
</script>

<script lang="ts">
  import { autoresizeTextarea } from '@zag-js/auto-resize'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFieldContext } from './use-field-context'

  let textareaRef = $state<HTMLTextAreaElement | null>(null)

  const { autoresize, ...props }: FieldTextareaProps = $props()

  const field = useFieldContext()
  const mergedProps = $derived(
    mergeProps(field?.().getTextareaProps() ?? {}, { style: { resize: autoresize ? 'none' : undefined } }, props),
  )

  $effect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef)
  })
</script>

<Ark as="textarea" {...mergedProps} bind:ref={textareaRef} />
