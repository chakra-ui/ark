import { ImageCropper } from '@ark-ui/react/image-cropper'
import { useState } from 'react'
import styles from 'styles/image-cropper.module.css'

export const Events = () => {
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [zoom, setZoom] = useState(1)

  return (
    <div className={styles.Layout}>
      <ImageCropper.Root
        className={styles.Root}
        onCropChange={(e) => setCropData(e.crop)}
        onZoomChange={(e) => setZoom(e.zoom)}
      >
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
      </ImageCropper.Root>

      <div className={styles.DataDisplay}>
        <div className={styles.DataItem}>
          <span className={styles.DataLabel}>Zoom</span>
          <span className={styles.DataValue}>{zoom.toFixed(2)}x</span>
        </div>
        <div className={styles.DataItem}>
          <span className={styles.DataLabel}>Position</span>
          <span className={styles.DataValue}>
            {Math.round(cropData.x)}, {Math.round(cropData.y)}
          </span>
        </div>
        <div className={styles.DataItem}>
          <span className={styles.DataLabel}>Size</span>
          <span className={styles.DataValue}>
            {Math.round(cropData.width)} × {Math.round(cropData.height)}
          </span>
        </div>
      </div>
    </div>
  )
}
