import { ImageCropper } from '@ark-ui/react/image-cropper'
import styles from 'styles/image-cropper.module.css'

export const MinMaxSize = () => {
  return (
    <div className={styles.Layout}>
      <p className={styles.Description}>Crop area constrained to min 80px and max 200px</p>

      <ImageCropper.Root className={styles.Root} minWidth={80} minHeight={80} maxWidth={200} maxHeight={200}>
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
