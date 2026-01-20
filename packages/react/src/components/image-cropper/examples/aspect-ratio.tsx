import { ImageCropper } from '@ark-ui/react/image-cropper'
import { RectangleHorizontalIcon, SquareIcon, RectangleVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const aspects = [
  { label: '16:9', value: 16 / 9, icon: RectangleHorizontalIcon },
  { label: '1:1', value: 1, icon: SquareIcon },
  { label: '9:16', value: 9 / 16, icon: RectangleVerticalIcon },
]

export const AspectRatio = () => {
  const [aspectRatio, setAspectRatio] = useState(16 / 9)

  return (
    <div className={styles.Layout}>
      <div className={button.Group}>
        {aspects.map((aspect) => (
          <button
            key={aspect.label}
            className={button.Root}
            data-variant={aspectRatio === aspect.value ? 'solid' : undefined}
            onClick={() => setAspectRatio(aspect.value)}
          >
            <aspect.icon />
            {aspect.label}
          </button>
        ))}
      </div>

      <ImageCropper.Root className={styles.Root} aspectRatio={aspectRatio}>
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
