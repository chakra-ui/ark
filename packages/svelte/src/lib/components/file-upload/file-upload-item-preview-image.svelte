<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps<'img'> {}
  export interface FileUploadItemPreviewImageProps
    extends Assign<HTMLProps<'img'>, FileUploadItemPreviewImageBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'
  import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

  const props: FileUploadItemPreviewImageProps = $props()

  let url = $state('')
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()

  $effect(() => {
    return fileUpload().createFileUrl(itemProps().file, (nextUrl) => {
      url = nextUrl
    })
  })

  const mergedProps = $derived(mergeProps(fileUpload().getItemPreviewImageProps({ ...itemProps(), url }), props))
</script>

{#if url}
  <Ark as="img" {...mergedProps} />
{/if}
