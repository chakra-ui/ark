<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseFileUploadContext } from './use-file-upload-context'

  export interface FileUploadContextProps {
    render?: Snippet<[UseFileUploadContext]>
  }
</script>

<script lang="ts">
  import { useFileUploadContext } from './use-file-upload-context'

  const { render }: FileUploadContextProps = $props()

  const context = useFileUploadContext()
</script>

{@render render?.(context)}
