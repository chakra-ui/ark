import { SignaturePad, useSignaturePad } from '@ark-ui/react/signature-pad'
import { RotateCcwIcon } from 'lucide-react'
import styles from 'styles/signature-pad.module.css'

export const RootProvider = () => {
  const signaturePad = useSignaturePad()

  return (
    <div className="stack">
      <output>no of paths: {signaturePad.paths.length}</output>
      <SignaturePad.RootProvider className={styles.Root} value={signaturePad}>
        <SignaturePad.Label className={styles.Label}>Sign below</SignaturePad.Label>
        <SignaturePad.Control className={styles.Control}>
          <SignaturePad.Segment className={styles.Segment} />
          <SignaturePad.ClearTrigger className={styles.ClearTrigger}>
            <RotateCcwIcon />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide className={styles.Guide} />
        </SignaturePad.Control>
      </SignaturePad.RootProvider>
    </div>
  )
}
