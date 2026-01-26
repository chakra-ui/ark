import { For, createSignal } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'
import { RotateCcwIcon, RotateCwIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const Rotation = () => {
  const [rotation, setRotation] = createSignal(0)

  return (
    <div class={styles.Layout}>
      <div class={button.Group}>
        <button class={button.Root} onClick={() => setRotation(rotation() - 90)}>
          <RotateCcwIcon />
        </button>
        <button class={button.Root} onClick={() => setRotation(rotation() + 90)}>
          <RotateCwIcon />
        </button>
        <span style={{ 'font-size': '0.875rem', padding: '0 0.5rem' }}>{rotation()}deg</span>
      </div>

      <ImageCropper.Root class={styles.Root} rotation={rotation()} onRotationChange={(e) => setRotation(e.rotation)}>
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
