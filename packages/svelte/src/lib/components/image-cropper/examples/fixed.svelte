<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
</script>

<ImageCropper.Root fixedCropArea>
  <ImageCropper.Viewport>
    <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="Landscape" />
    <ImageCropper.Selection>
      <ImageCropper.Grid axis="horizontal" />
      <ImageCropper.Grid axis="vertical" />
    </ImageCropper.Selection>
  </ImageCropper.Viewport>
</ImageCropper.Root>
