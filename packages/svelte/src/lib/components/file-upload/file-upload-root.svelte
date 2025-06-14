<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFileUploadProps } from './use-file-upload.svelte'

  export interface FileUploadRootBaseProps extends UseFileUploadProps, PolymorphicProps<'div'> {}
  export interface FileUploadRootProps extends Assign<HTMLProps<'div'>, FileUploadRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { FileUploadProvider } from './use-file-upload-context'
  import { useFileUpload } from './use-file-upload.svelte'

  const props: FileUploadRootProps = $props()
  const providedId = $props.id()

  const [useFileUploadProps, localProps] = $derived(
    createSplitProps<UseFileUploadProps>()(props, [
      'accept',
      'allowDrop',
      'capture',
      'directory',
      'disabled',
      'id',
      'ids',
      'invalid',
      'locale',
      'maxFiles',
      'maxFileSize',
      'minFileSize',
      'name',
      'onFileAccept',
      'onFileChange',
      'onFileReject',
      'preventDocumentDrop',
      'required',
      'translations',
      'transformFiles',
      'validate',
    ]),
  )

  const resolvedProps = $derived<UseFileUploadProps>({
    ...useFileUploadProps,
    id: useFileUploadProps.id ?? providedId,
  })

  const fileUpload = useFileUpload(() => resolvedProps)
  const mergedProps = $derived(mergeProps(fileUpload().getRootProps(), localProps))

  FileUploadProvider(fileUpload)
</script>

<Ark as="div" {...mergedProps} />
