import { For } from 'solid-js'
import { ImageCropper, useImageCropper } from '@ark-ui/solid/image-cropper'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const RootProvider = () => {
  const imageCropper = useImageCropper()

  return (
    <div class={styles.Layout}>
      <div class={button.Group}>
        <button class={button.Root} onClick={() => imageCropper().setZoom(imageCropper().zoom - 0.1)}>
          <ZoomOutIcon />
        </button>
        <span style={{ 'font-size': '0.875rem', 'min-width': '3rem', 'text-align': 'center' }}>
          {imageCropper().zoom.toFixed(1)}x
        </span>
        <button class={button.Root} onClick={() => imageCropper().setZoom(imageCropper().zoom + 0.1)}>
          <ZoomInIcon />
        </button>
      </div>

      <ImageCropper.RootProvider class={styles.Root} value={imageCropper}>
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
      </ImageCropper.RootProvider>
    </div>
  )
}
