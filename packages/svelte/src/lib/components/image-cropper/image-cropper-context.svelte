<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseImageCropperContext } from './use-image-cropper-context'

  export interface ImageCropperContextProps {
    render?: Snippet<[UseImageCropperContext]>
  }
</script>

<script lang="ts">
  import { useImageCropperContext } from './use-image-cropper-context'

  const { render }: ImageCropperContextProps = $props()

  const context = useImageCropperContext()
</script>

{@render render?.(context)}
