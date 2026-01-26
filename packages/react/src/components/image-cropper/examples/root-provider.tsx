import { ImageCropper, useImageCropper } from '@ark-ui/react/image-cropper'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const RootProvider = () => {
  const imageCropper = useImageCropper()

  return (
    <div className={styles.Layout}>
      <div className={button.Group}>
        <button className={button.Root} onClick={() => imageCropper.setZoom(imageCropper.zoom - 0.1)}>
          <ZoomOutIcon />
        </button>
        <span style={{ fontSize: '0.875rem', minWidth: '3rem', textAlign: 'center' }}>
          {imageCropper.zoom.toFixed(1)}x
        </span>
        <button className={button.Root} onClick={() => imageCropper.setZoom(imageCropper.zoom + 0.1)}>
          <ZoomInIcon />
        </button>
      </div>

      <ImageCropper.RootProvider className={styles.Root} value={imageCropper}>
        <ImageCropper.Viewport className={styles.Viewport}>
          <ImageCropper.Image
            className={styles.Image}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Sample"
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
    </div>
  )
}
