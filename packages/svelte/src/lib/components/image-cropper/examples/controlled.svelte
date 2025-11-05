<script>
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'

  let zoom = $state(1)
</script>

<div>
  <button onclick={() => (zoom += 0.1)}>Zoom In</button>
  <button onclick={() => (zoom -= 0.1)}>Zoom Out</button>

  <ImageCropper.Root bind:zoom>
    <ImageCropper.Viewport>
      <ImageCropper.Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="Sample"
      />
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
  </ImageCropper.Root>
</div>
