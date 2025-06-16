<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface FileUploadHiddenInputBaseProps extends PolymorphicProps<'input'> {}
  export interface FileUploadHiddenInputProps extends Assign<HTMLProps<'input'>, FileUploadHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  const props: FileUploadHiddenInputProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getHiddenInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />
