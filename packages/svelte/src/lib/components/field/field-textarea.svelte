<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldTextareaBaseProps extends PolymorphicProps<'textarea'>, RefAttribute {
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

  let { ref = $bindable(), autoresize, ...props }: FieldTextareaProps = $props()

  let textareaRef = $state<HTMLTextAreaElement | null>(null)

  const field = useFieldContext()
  const mergedProps = $derived(
    mergeProps(field?.().getTextareaProps() ?? {}, { style: { resize: autoresize ? 'none' : undefined } }, props),
  )

  $effect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef)
  })

  function setNode(node: HTMLTextAreaElement | null) {
    textareaRef = node
  }
</script>

<Ark as="textarea" bind:ref {...mergedProps} {@attach setNode} />
