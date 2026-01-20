<script lang="ts">
  import { ImageCropper, useImageCropper } from '@ark-ui/svelte/image-cropper'
  import { CropIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/image-cropper.module.css'

  const imageCropper = useImageCropper()
  let preview = $state<string | null>(null)

  const handleCrop = async () => {
    const result = await imageCropper().getCroppedImage({ output: 'dataUrl' })
    if (typeof result === 'string') {
      preview = result
    }
  }
</script>

<div class={styles.Layout}>
  <div class={button.Group}>
    <button type="button" class={button.Root} data-variant="solid" onclick={handleCrop}>
      <CropIcon />
      Crop Image
    </button>
  </div>

  <ImageCropper.RootProvider class={styles.Root} value={imageCropper}>
    <ImageCropper.Viewport class={styles.Viewport}>
      <ImageCropper.Image
        class={styles.Image}
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="Sample"
        crossorigin="anonymous"
      />
      <ImageCropper.Selection class={styles.Selection}>
        {#each ImageCropper.handles as position}
          <ImageCropper.Handle class={styles.Handle} {position}>
            <div></div>
          </ImageCropper.Handle>
        {/each}
        <ImageCropper.Grid class={styles.Grid} axis="horizontal" />
        <ImageCropper.Grid class={styles.Grid} axis="vertical" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.RootProvider>

  <div class={styles.Preview}>
    <span class={styles.PreviewLabel}>Preview</span>
    {#if preview}
      <img src={preview} alt="Cropped preview" class={styles.PreviewImage} />
    {/if}
  </div>
</div>
