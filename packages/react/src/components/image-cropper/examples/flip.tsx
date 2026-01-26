import { ImageCropper } from '@ark-ui/react/image-cropper'
import { FlipHorizontalIcon, FlipVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

export const Flip = () => {
  const [flip, setFlip] = useState({ horizontal: false, vertical: false })

  return (
    <div className={styles.Layout}>
      <div className={button.Group}>
        <button
          className={button.Root}
          data-variant={flip.horizontal ? 'solid' : undefined}
          onClick={() => setFlip({ ...flip, horizontal: !flip.horizontal })}
        >
          <FlipHorizontalIcon />
          Horizontal
        </button>
        <button
          className={button.Root}
          data-variant={flip.vertical ? 'solid' : undefined}
          onClick={() => setFlip({ ...flip, vertical: !flip.vertical })}
        >
          <FlipVerticalIcon />
          Vertical
        </button>
      </div>

      <ImageCropper.Root className={styles.Root} flip={flip} onFlipChange={(e) => setFlip(e.flip)}>
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
