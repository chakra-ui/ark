import { Highlight } from '../..'

export const WithRepeatingText = () => {
  return (
    <Highlight
      query="s"
      matchAll
      text="Thissssssssss is an example. Chinese: 这是一句中文。 Emoji:"
    />
  )
}
