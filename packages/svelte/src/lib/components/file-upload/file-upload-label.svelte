<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface FileUploadLabelProps extends Assign<HTMLProps<'label'>, FileUploadLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  let { ref = $bindable(null), ...props }: FileUploadLabelProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
