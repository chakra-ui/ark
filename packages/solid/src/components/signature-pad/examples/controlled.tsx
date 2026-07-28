import { SignaturePad } from '@ark-ui/solid/signature-pad'
import { RotateCcwIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/signature-pad.module.css'

export const Controlled = () => {
  const [paths, setPaths] = createSignal<string[]>([])

  return (
    <div class="stack">
      <output>paths: {paths().length}</output>
      <SignaturePad.Root class={styles.Root} paths={paths()} onDraw={(details) => setPaths(details.paths)}>
        <SignaturePad.Label class={styles.Label}>Sign below</SignaturePad.Label>
        <SignaturePad.Control class={styles.Control}>
          <SignaturePad.Segment class={styles.Segment} />
          <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
            <RotateCcwIcon />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide class={styles.Guide} />
        </SignaturePad.Control>
      </SignaturePad.Root>
      <button class={button.Root} onClick={() => setPaths([])}>
        Clear
      </button>
    </div>
  )
}
