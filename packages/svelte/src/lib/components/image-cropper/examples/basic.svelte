<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
</script>

<ImageCropper.Root>
  <ImageCropper.Viewport>
    <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="Landscape" />
    <ImageCropper.Selection>
      {#each ImageCropper.handles as position}
        <ImageCropper.Handle {position}>
          <div></div>
        </ImageCropper.Handle>
      {/each}
    </ImageCropper.Selection>
  </ImageCropper.Viewport>
</ImageCropper.Root>
