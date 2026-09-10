<script module lang="ts">
  import type { RootState } from '@zag-js/file-upload'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFileUploadReturn } from './use-file-upload.svelte.ts'

  interface RootProviderProps {
    value: UseFileUploadReturn
  }

  export interface FileUploadRootProviderState extends RootState {}
  export interface FileUploadRootProviderBaseProps
    extends RootProviderProps, PolymorphicProps<'div', FileUploadRootProviderState>, RefAttribute {}
  export interface FileUploadRootProviderProps extends Assign<HTMLProps<'div'>, FileUploadRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { FileUploadProvider } from './use-file-upload-context.ts'

  let { ref = $bindable(null), value, ...props }: FileUploadRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FileUploadProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} state={value().getRootState()} />
