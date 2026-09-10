<script module lang="ts">
  import type { TriggerState } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadTriggerState extends TriggerState {}
  export interface FileUploadTriggerBaseProps
    extends PolymorphicProps<'button', FileUploadTriggerState>, RefAttribute {}
  export interface FileUploadTriggerProps extends Assign<HTMLProps<'button'>, FileUploadTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'

  let { ref = $bindable(null), ...props }: FileUploadTriggerProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} state={fileUpload().getTriggerState()} />
