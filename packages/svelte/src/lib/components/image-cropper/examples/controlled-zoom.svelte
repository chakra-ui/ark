<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
  import { ZoomInIcon, ZoomOutIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/image-cropper.module.css'

  let zoom = $state(1)
</script>

<div class={styles.Layout}>
  <div class={button.Group}>
    <button type="button" class={button.Root} onclick={() => (zoom -= 0.1)}>
      <ZoomOutIcon />
    </button>
    <span style="font-size: 0.875rem; min-width: 3rem; text-align: center;">{zoom.toFixed(1)}x</span>
    <button type="button" class={button.Root} onclick={() => (zoom += 0.1)}>
      <ZoomInIcon />
    </button>
  </div>

  <ImageCropper.Root class={styles.Root} bind:zoom>
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
</div>
