import { ImageCropper } from '@ark-ui/react/image-cropper'
import { useState } from 'react'

export const Controlled = () => {
  const [zoom, setZoom] = useState(1)

  return (
    <>
      <button onClick={() => setZoom(zoom + 0.1)}>Zoom In</button>
      <button onClick={() => setZoom(zoom - 0.1)}>Zoom Out</button>

      <ImageCropper.Root zoom={zoom} onZoomChange={(e) => setZoom(e.zoom)}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
          <ImageCropper.Selection>
            {ImageCropper.handles.map((position) => (
              <ImageCropper.Handle key={position} position={position}>
                <div />
              </ImageCropper.Handle>
            ))}
            <ImageCropper.Grid axis="horizontal" />
            <ImageCropper.Grid axis="vertical" />
          </ImageCropper.Selection>
        </ImageCropper.Viewport>
      </ImageCropper.Root>
    </>
  )
}
