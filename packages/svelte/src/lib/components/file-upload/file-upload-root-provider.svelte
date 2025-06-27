<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFileUploadReturn } from './use-file-upload.svelte'

  interface RootProviderProps {
    value: UseFileUploadReturn
  }

  export interface FileUploadRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface FileUploadRootProviderProps extends Assign<HTMLProps<'div'>, FileUploadRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { FileUploadProvider } from './use-file-upload-context'

  let { ref = $bindable(), value, ...props }: FileUploadRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FileUploadProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
