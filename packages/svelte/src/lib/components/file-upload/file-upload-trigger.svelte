<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FileUploadTriggerProps extends Assign<HTMLProps<'button'>, FileUploadTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useFileUploadContext } from './use-file-upload-context'

  let { ref = $bindable(), ...props }: FileUploadTriggerProps = $props()
  const fileUpload = useFileUploadContext()
  const mergedProps = $derived(mergeProps(fileUpload().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
