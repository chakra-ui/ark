<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FileUploadItemDeleteTriggerProps extends Assign<
    HTMLProps<'button'>,
    FileUploadItemDeleteTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFileUploadContext } from './use-file-upload-context.ts'
  import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

  let { ref = $bindable(null), ...props }: FileUploadItemDeleteTriggerProps = $props()
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = $derived(mergeProps(fileUpload().getItemDeleteTriggerProps(itemProps()), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
