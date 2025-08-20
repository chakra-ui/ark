import { Highlight } from '@ark-ui/solid/highlight'

export const ExactMatch = () => {
  return (
    <div>
      <p>Without exactMatch (highlights partial matches):</p>
      <Highlight query="cat" text="The cat is in the category. A cat-like creature." matchAll />
      <p style={{ 'margin-top': '1rem' }}>With exactMatch (highlights whole words only):</p>
      <Highlight query="cat" text="The cat is in the category. A cat-like creature." exactMatch matchAll />
    </div>
  )
}
