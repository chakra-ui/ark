<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FileUploadClearTriggerProps extends Assign<HTMLProps<'button'>, FileUploadClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  let { ref = $bindable(null), ...props }: FileUploadClearTriggerProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
