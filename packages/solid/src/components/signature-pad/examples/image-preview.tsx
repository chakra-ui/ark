import { Show, createSignal } from 'solid-js'
import { SignaturePad } from '../..'

export const ImagePreview = () => {
  const [imageUrl, setImageUrl] = createSignal<string>()

  return (
    <>
      <SignaturePad.Root
        onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => setImageUrl(url))}
      >
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Control>
          <SignaturePad.Segment fill="orange" />
          <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
          <SignaturePad.Guide />
        </SignaturePad.Control>
      </SignaturePad.Root>
      <Show when={imageUrl()}>
        <img src={imageUrl()} alt="Signature" />
      </Show>
    </>
  )
}
