import { Marquee } from '@ark-ui/react/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const Vertical = () => (
  <Marquee.Root side="bottom" style={{ height: '300px' }}>
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} style={{ padding: '1rem 0' }}>
            {item}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
