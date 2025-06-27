<script module lang="ts">
  import type { DropzoneProps } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadDropzoneBaseProps extends PolymorphicProps<'div'>, DropzoneProps, RefAttribute {}
  export interface FileUploadDropzoneProps extends Assign<HTMLProps<'div'>, FileUploadDropzoneBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  let { ref = $bindable(null), ...props }: FileUploadDropzoneProps = $props()
  const fileUpload = useFileUploadContext()

  const [dropzoneProps, localProps] = $derived(createSplitProps<DropzoneProps>()(props, ['disableClick']))

  const mergedProps = $derived(mergeProps(fileUpload().getDropzoneProps(dropzoneProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
