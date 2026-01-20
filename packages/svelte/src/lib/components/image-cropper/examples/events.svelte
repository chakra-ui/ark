<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
  import styles from 'styles/image-cropper.module.css'

  let cropData = $state({ x: 0, y: 0, width: 0, height: 0 })
  let zoom = $state(1)
</script>

<div class={styles.Layout}>
  <ImageCropper.Root
    class={styles.Root}
    onCropChange={(e) => (cropData = e.crop)}
    onZoomChange={(e) => (zoom = e.zoom)}
  >
    <ImageCropper.Viewport class={styles.Viewport}>
      <ImageCropper.Image
        class={styles.Image}
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="Sample"
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
  </ImageCropper.Root>

  <div class={styles.DataDisplay}>
    <div class={styles.DataItem}>
      <span class={styles.DataLabel}>Zoom</span>
      <span class={styles.DataValue}>{zoom.toFixed(2)}x</span>
    </div>
    <div class={styles.DataItem}>
      <span class={styles.DataLabel}>Position</span>
      <span class={styles.DataValue}>
        {Math.round(cropData.x)}, {Math.round(cropData.y)}
      </span>
    </div>
    <div class={styles.DataItem}>
      <span class={styles.DataLabel}>Size</span>
      <span class={styles.DataValue}>
        {Math.round(cropData.width)} x {Math.round(cropData.height)}
      </span>
    </div>
  </div>
</div>
