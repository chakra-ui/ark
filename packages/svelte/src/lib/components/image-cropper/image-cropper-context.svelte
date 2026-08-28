<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseImageCropperContext } from './use-image-cropper-context.ts'

  export interface ImageCropperContextProps {
    render?: Snippet<[UseImageCropperContext]>
  }
</script>

<script lang="ts">
  import { useImageCropperContext } from './use-image-cropper-context.ts'

  const { render }: ImageCropperContextProps = $props()

  const context = useImageCropperContext()
</script>

{@render render?.(context)}
