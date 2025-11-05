import { ImageCropper, useImageCropper } from '@ark-ui/react/image-cropper'

export const RootProvider = () => {
  const imageCropper = useImageCropper()

  return (
    <>
      <button onClick={() => imageCropper.setZoom(imageCropper.zoom + 0.1)}>Zoom In</button>
      <button onClick={() => imageCropper.setZoom(imageCropper.zoom - 0.1)}>Zoom Out</button>

      <ImageCropper.RootProvider value={imageCropper}>
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
      </ImageCropper.RootProvider>
    </>
  )
}
