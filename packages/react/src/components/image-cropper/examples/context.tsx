import { ImageCropper } from '@ark-ui/react/image-cropper'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const Context = () => {
  return (
    <div className={styles.Layout}>
      <ImageCropper.Root className={styles.Root}>
        <ImageCropper.Context>
          {(context) => (
            <div className={button.Group}>
              <button className={button.Root} onClick={() => context.zoomBy(-0.1)}>
                <ZoomOutIcon />
              </button>
              <span style={{ fontSize: '0.875rem', padding: '0 0.5rem', minWidth: '3rem', textAlign: 'center' }}>
                {context.zoom.toFixed(1)}x
              </span>
              <button className={button.Root} onClick={() => context.zoomBy(0.1)}>
                <ZoomInIcon />
              </button>
            </div>
          )}
        </ImageCropper.Context>

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
