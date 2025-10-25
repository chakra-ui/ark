import { ImageCropper } from '@ark-ui/react/image-cropper'

export const Basic = () => {
  const handlePositions = [
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
  ] as const

  return (
    <ImageCropper.Root>
      <ImageCropper.Viewport>
        <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
        <ImageCropper.Selection>
          {handlePositions.map((position) => (
            <ImageCropper.Handle key={position} position={position} />
          ))}
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  )
}
