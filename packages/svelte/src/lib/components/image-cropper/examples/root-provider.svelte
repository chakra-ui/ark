<script>
  import { ImageCropper, useImageCropper } from '@ark-ui/svelte/image-cropper'

  const id = $props.id()
  const imageCropper = useImageCropper({ id })
</script>

<div>
  <button onclick={() => imageCropper().setZoom(imageCropper().zoom + 0.1)}>Zoom In</button>
  <button onclick={() => imageCropper().setZoom(imageCropper().zoom - 0.1)}>Zoom Out</button>

  <ImageCropper.RootProvider value={imageCropper}>
    <ImageCropper.Viewport>
      <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
      <ImageCropper.Selection>
        {#each ImageCropper.handles as position}
          <ImageCropper.Handle {position}>
            <div></div>
          </ImageCropper.Handle>
        {/each}
        <ImageCropper.Grid axis="horizontal" />
        <ImageCropper.Grid axis="vertical" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.RootProvider>
</div>
