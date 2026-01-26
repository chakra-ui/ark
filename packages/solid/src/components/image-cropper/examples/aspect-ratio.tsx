import { For, createSignal } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'
import { RectangleHorizontalIcon, SquareIcon, RectangleVerticalIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const aspects = [
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontalIcon },
  { label: '1:1', value: 1, icon: SquareIcon },
  { label: '9:16', value: 9 / 16, icon: RectangleVerticalIcon },
]

export const AspectRatio = () => {
  const [aspectRatio, setAspectRatio] = createSignal(16 / 9)

  return (
    <div class={styles.Layout}>
      <div class={button.Group}>
        <For each={aspects}>
          {(aspect) => (
            <button
              class={button.Root}
              data-variant={aspectRatio() === aspect.value ? 'solid' : undefined}
              onClick={() => setAspectRatio(aspect.value)}
            >
              <aspect.icon />
              {aspect.label}
            </button>
          )}
        </For>
      </div>

      <ImageCropper.Root class={styles.Root} aspectRatio={aspectRatio()}>
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
