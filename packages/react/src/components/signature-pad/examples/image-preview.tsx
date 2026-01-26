import { SignaturePad } from '@ark-ui/react/signature-pad'
import { RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/signature-pad.module.css'

export const ImagePreview = () => {
  const [imageUrl, setImageUrl] = useState('')

  return (
    <div className="stack">
      <SignaturePad.Root
        className={styles.Root}
        onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => setImageUrl(url))}
      >
        <SignaturePad.Label className={styles.Label}>Sign below</SignaturePad.Label>
        <SignaturePad.Control className={styles.Control}>
          <SignaturePad.Segment className={styles.Segment} />
          <SignaturePad.ClearTrigger className={styles.ClearTrigger}>
            <RotateCcwIcon />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide className={styles.Guide} />
        </SignaturePad.Control>
      </SignaturePad.Root>

      <div className="stack">
        <span>Image Preview</span>
        {imageUrl && <img src={imageUrl} alt="Signature" className={styles.Image} />}
      </div>
    </div>
  )
}
