import { Marquee } from '@ark-ui/react/marquee'

const items = ['Apple', 'Banana', 'Cherry']

export const AutoFill = () => (
  <Marquee.Root autoFill spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '0 2rem' }}>
            {item}
          </div>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
