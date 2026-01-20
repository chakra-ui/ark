import { ImageCropper, useImageCropper } from '@ark-ui/react/image-cropper'
import { CropIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const CropPreview = () => {
  const imageCropper = useImageCropper()
  const [preview, setPreview] = useState<string | null>(null)

  const handleCrop = async () => {
    const result = await imageCropper.getCroppedImage({ output: 'dataUrl' })
    if (typeof result === 'string') {
      setPreview(result)
    }
  }

  return (
    <div className={styles.Layout}>
      <div className={button.Group}>
        <button className={button.Root} data-variant="solid" onClick={handleCrop}>
          <CropIcon />
          Crop Image
        </button>
      </div>

      <ImageCropper.RootProvider className={styles.Root} value={imageCropper}>
        <ImageCropper.Viewport className={styles.Viewport}>
          <ImageCropper.Image
            className={styles.Image}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Sample"
            crossOrigin="anonymous"
          />
          <ImageCropper.Selection className={styles.Selection}>
            {ImageCropper.handles.map((position) => (
              <ImageCropper.Handle className={styles.Handle} key={position} position={position}>
                <div />
              </ImageCropper.Handle>
            ))}
            <ImageCropper.Grid className={styles.Grid} axis="horizontal" />
            <ImageCropper.Grid className={styles.Grid} axis="vertical" />
          </ImageCropper.Selection>
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>

      <div className={styles.Preview}>
        <span className={styles.PreviewLabel}>Preview</span>
        {preview && <img src={preview} alt="Cropped preview" className={styles.PreviewImage} />}
      </div>
    </div>
  )
}
