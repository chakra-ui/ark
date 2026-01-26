<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
  import { FlipHorizontalIcon, FlipVerticalIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/image-cropper.module.css'

  let flip = $state({ horizontal: false, vertical: false })
</script>

<div class={styles.Layout}>
  <div class={button.Group}>
    <button
      type="button"
      class={button.Root}
      data-variant={flip.horizontal ? 'solid' : undefined}
      onclick={() => (flip = { ...flip, horizontal: !flip.horizontal })}
    >
      <FlipHorizontalIcon />
      Horizontal
    </button>
    <button
      type="button"
      class={button.Root}
      data-variant={flip.vertical ? 'solid' : undefined}
      onclick={() => (flip = { ...flip, vertical: !flip.vertical })}
    >
      <FlipVerticalIcon />
      Vertical
    </button>
  </div>

  <ImageCropper.Root class={styles.Root} {flip} onFlipChange={(e) => (flip = e.flip)}>
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
