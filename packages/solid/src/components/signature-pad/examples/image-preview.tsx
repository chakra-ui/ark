import { SignaturePad } from '@ark-ui/solid/signature-pad'
import { RotateCcwIcon } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'
import styles from 'styles/signature-pad.module.css'

export const ImagePreview = () => {
  const [imageUrl, setImageUrl] = createSignal('')

  return (
    <div class="stack">
      <SignaturePad.Root
        class={styles.Root}
        onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => setImageUrl(url))}
      >
        <SignaturePad.Label class={styles.Label}>Sign below</SignaturePad.Label>
        <SignaturePad.Control class={styles.Control}>
          <SignaturePad.Segment class={styles.Segment} />
          <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
            <RotateCcwIcon />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide class={styles.Guide} />
        </SignaturePad.Control>
      </SignaturePad.Root>

      <div class="stack">
        <span>Image Preview</span>
        <Show when={imageUrl()}>
          <img src={imageUrl()} alt="Signature" class={styles.Image} />
        </Show>
      </div>
    </div>
  )
}
