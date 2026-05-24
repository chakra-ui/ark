<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemPreviewBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The file type to match against. Matches all file types by default.
     */
    type?: string
  }
  export interface FileUploadItemPreviewProps extends Assign<HTMLProps<'div'>, FileUploadItemPreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'
  import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

  let { ref = $bindable(null), type, ...props }: FileUploadItemPreviewProps = $props()
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = $derived(mergeProps(fileUpload().getItemPreviewProps(itemProps()), props))

  const shouldRender = $derived(itemProps().file.type.match(type ?? '.*'))
</script>

{#if shouldRender}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
