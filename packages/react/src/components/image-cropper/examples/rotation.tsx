import { ImageCropper } from '@ark-ui/react/image-cropper'
import { RotateCcwIcon, RotateCwIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const Rotation = () => {
  const [rotation, setRotation] = useState(0)

  return (
    <div className={styles.Layout}>
      <div className={button.Group}>
        <button className={button.Root} onClick={() => setRotation(rotation - 90)}>
          <RotateCcwIcon />
        </button>
        <button className={button.Root} onClick={() => setRotation(rotation + 90)}>
          <RotateCwIcon />
        </button>
        <span style={{ fontSize: '0.875rem', padding: '0 0.5rem' }}>{rotation}°</span>
      </div>

      <ImageCropper.Root className={styles.Root} rotation={rotation} onRotationChange={(e) => setRotation(e.rotation)}>
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
    </div>
  )
}
