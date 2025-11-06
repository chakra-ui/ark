import { For, createSignal } from 'solid-js'
import { ImageCropper } from '@ark-ui/solid/image-cropper'

export const Controlled = () => {
  const [zoom, setZoom] = createSignal(1)

  return (
    <>
      <button onClick={() => setZoom(zoom() + 0.1)}>Zoom In</button>
      <button onClick={() => setZoom(zoom() - 0.1)}>Zoom Out</button>

      <ImageCropper.Root zoom={zoom()} onZoomChange={(details) => setZoom(details.zoom)}>
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
            <ImageCropper.Grid axis="horizontal" />
            <ImageCropper.Grid axis="vertical" />
          </ImageCropper.Selection>
        </ImageCropper.Viewport>
      </ImageCropper.Root>
    </>
  )
}
