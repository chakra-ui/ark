import { For, createSignal, Show } from 'solid-js'
import { ImageCropper, useImageCropper } from '@ark-ui/solid/image-cropper'
import { CropIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const CropPreview = () => {
  const imageCropper = useImageCropper()
  const [preview, setPreview] = createSignal<string | null>(null)

  const handleCrop = async () => {
    const result = await imageCropper().getCroppedImage({ output: 'dataUrl' })
    if (typeof result === 'string') {
      setPreview(result)
    }
  }

  return (
    <div class={styles.Layout}>
      <div class={button.Group}>
        <button class={button.Root} data-variant="solid" onClick={handleCrop}>
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
            crossOrigin="anonymous"
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

      <div class={styles.Preview}>
        <span class={styles.PreviewLabel}>Preview</span>
        <Show when={preview()}>
          <img src={preview()!} alt="Cropped preview" class={styles.PreviewImage} />
        </Show>
      </div>
    </div>
  )
}
