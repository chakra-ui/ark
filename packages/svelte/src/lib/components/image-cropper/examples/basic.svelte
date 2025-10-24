<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'

  const handlePositions = [
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
  ] as const
</script>

<ImageCropper.Root>
  <ImageCropper.Viewport>
    <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="Landscape" />
    <ImageCropper.Selection>
      {#each handlePositions as position}
        <ImageCropper.Handle {position} />
      {/each}
    </ImageCropper.Selection>
  </ImageCropper.Viewport>
</ImageCropper.Root>
