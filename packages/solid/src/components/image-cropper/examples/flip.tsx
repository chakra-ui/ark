import { For, createSignal } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'
import { FlipHorizontalIcon, FlipVerticalIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const Flip = () => {
  const [flip, setFlip] = createSignal({ horizontal: false, vertical: false })

  return (
    <div class={styles.Layout}>
      <div class={button.Group}>
        <button
          class={button.Root}
          data-variant={flip().horizontal ? 'solid' : undefined}
          onClick={() => setFlip({ ...flip(), horizontal: !flip().horizontal })}
        >
          <FlipHorizontalIcon />
          Horizontal
        </button>
        <button
          class={button.Root}
          data-variant={flip().vertical ? 'solid' : undefined}
          onClick={() => setFlip({ ...flip(), vertical: !flip().vertical })}
        >
          <FlipVerticalIcon />
          Vertical
        </button>
      </div>

      <ImageCropper.Root class={styles.Root} flip={flip()} onFlipChange={(e) => setFlip(e.flip)}>
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
