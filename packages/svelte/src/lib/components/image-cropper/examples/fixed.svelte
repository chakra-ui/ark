<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
  import styles from 'styles/image-cropper.module.css'
</script>

<div class={styles.Layout}>
  <ImageCropper.Root class={styles.Root} fixedCropArea>
    <ImageCropper.Viewport class={styles.Viewport}>
      <ImageCropper.Image
        class={styles.Image}
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="Sample"
      />
      <ImageCropper.Selection class={styles.Selection}>
        <ImageCropper.Grid class={styles.Grid} axis="horizontal" />
        <ImageCropper.Grid class={styles.Grid} axis="vertical" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.Root>
</div>
