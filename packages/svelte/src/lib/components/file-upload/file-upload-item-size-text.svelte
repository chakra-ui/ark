<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemSizeTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FileUploadItemSizeTextProps extends Assign<HTMLProps<'div'>, FileUploadItemSizeTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'
  import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

  let { ref = $bindable(null), ...props }: FileUploadItemSizeTextProps = $props()
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = $derived(mergeProps(fileUpload().getItemSizeTextProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children?.()}
  {:else}
    {fileUpload().getFileSize(itemProps().file)}
  {/if}
</Ark>
