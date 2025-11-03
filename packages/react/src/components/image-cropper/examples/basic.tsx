import { ImageCropper } from '@ark-ui/react/image-cropper'

export const Basic = () => {
  return (
    <ImageCropper.Root>
      <ImageCropper.Viewport>
        <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
        <ImageCropper.Selection>
          {ImageCropper.handles.map((position) => (
            <ImageCropper.Handle key={position} position={position}>
              <div />
            </ImageCropper.Handle>
          ))}
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  )
}
