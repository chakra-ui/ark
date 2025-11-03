import { Marquee } from '@ark-ui/react/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const WithEdges = () => (
  <Marquee.Root>
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} style={{ padding: '0 2rem' }}>
            {item}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
)
