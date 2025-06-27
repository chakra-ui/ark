<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FileUploadItemGroupProps extends Assign<HTMLProps<'div'>, FileUploadItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  let { ref = $bindable(null), ...props }: FileUploadItemGroupProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getItemGroupProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
