import { For } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'

export const Circle = () => {
  return (
    <ImageCropper.Root cropShape="circle">
      <ImageCropper.Viewport>
        <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
        <ImageCropper.Selection>
          <For each={ImageCropper.handles}>
            {(position) => (
              <ImageCropper.Handle position={position}>
                <div />
              </ImageCropper.Handle>
            )}
          </For>
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  )
}
