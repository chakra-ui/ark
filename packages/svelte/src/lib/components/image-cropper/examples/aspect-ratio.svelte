<script lang="ts">
  import { ImageCropper } from '@ark-ui/svelte/image-cropper'
  import { RectangleHorizontalIcon, SquareIcon, RectangleVerticalIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/image-cropper.module.css'

  const aspects = [
    { label: '16:9', value: 16 / 9, icon: RectangleHorizontalIcon },
    { label: '1:1', value: 1, icon: SquareIcon },
    { label: '9:16', value: 9 / 16, icon: RectangleVerticalIcon },
  ]

  let aspectRatio = $state(16 / 9)
</script>

<div class={styles.Layout}>
  <div class={button.Group}>
    {#each aspects as aspect}
      <button
        type="button"
        class={button.Root}
        data-variant={aspectRatio === aspect.value ? 'solid' : undefined}
        onclick={() => (aspectRatio = aspect.value)}
      >
        <aspect.icon />
        {aspect.label}
      </button>
    {/each}
  </div>

  <ImageCropper.Root class={styles.Root} {aspectRatio}>
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
