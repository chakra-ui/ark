import { Highlight } from '@ark-ui/solid/highlight'

export const Multiple = () => {
  return (
    <Highlight
      query={['ipsum', 'amet']}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt"
    />
  )
}
