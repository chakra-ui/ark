import { useState } from 'react'
import { SignaturePad } from '../..'

export const ImagePreview = () => {
  const [imageUrl, setImageUrl] = useState('')

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

      {imageUrl && <img src={imageUrl} alt="Signature" />}
    </>
  )
}
