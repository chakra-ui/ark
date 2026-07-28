import { SignaturePad } from '@ark-ui/react/signature-pad'
import { RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/signature-pad.module.css'

export const Controlled = () => {
  const [paths, setPaths] = useState<string[]>([])

  return (
    <div className="stack">
      <output>paths: {paths.length}</output>
      <SignaturePad.Root className={styles.Root} paths={paths} onDraw={(details) => setPaths(details.paths)}>
        <SignaturePad.Label className={styles.Label}>Sign below</SignaturePad.Label>
        <SignaturePad.Control className={styles.Control}>
          <SignaturePad.Segment className={styles.Segment} />
          <SignaturePad.ClearTrigger className={styles.ClearTrigger}>
            <RotateCcwIcon />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide className={styles.Guide} />
        </SignaturePad.Control>
      </SignaturePad.Root>
      <button className={button.Root} onClick={() => setPaths([])}>
        Clear
      </button>
    </div>
  )
}
