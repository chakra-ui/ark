import { For } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'
import styles from 'styles/image-cropper.module.css'

export const MinMaxSize = () => {
  return (
    <div class={styles.Layout}>
      <p class={styles.Description}>Crop area constrained to min 80px and max 200px</p>

      <ImageCropper.Root class={styles.Root} minWidth={80} minHeight={80} maxWidth={200} maxHeight={200}>
        <ImageCropper.Viewport class={styles.Viewport}>
          <ImageCropper.Image
            class={styles.Image}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Sample"
          />
          <ImageCropper.Selection class={styles.Selection}>
            <For each={ImageCropper.handles}>
              {(position) => (
                <ImageCropper.Handle class={styles.Handle} position={position}>
                  <div />
                </ImageCropper.Handle>
              )}
            </For>
            <ImageCropper.Grid class={styles.Grid} axis="horizontal" />
            <ImageCropper.Grid class={styles.Grid} axis="vertical" />
          </ImageCropper.Selection>
        </ImageCropper.Viewport>
      </ImageCropper.Root>
    </div>
  )
}
