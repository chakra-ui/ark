<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFileUploadReturn } from './use-file-upload.svelte'

  interface RootProviderProps {
    value: UseFileUploadReturn
  }

  export interface FileUploadRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
  export interface FileUploadRootProviderProps extends Assign<HTMLProps<'div'>, FileUploadRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { FileUploadProvider } from './use-file-upload-context'

  const { value, ...props }: FileUploadRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FileUploadProvider(value)
</script>

<Ark as="div" {...mergedProps} />
