import { For } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const Vertical = () => (
  <Marquee.Root side="bottom" style={{ height: '300px' }}>
    <Marquee.Viewport>
      <Marquee.Content>
        <For each={items}>{(item) => <Marquee.Item style={{ padding: '1rem 0' }}>{item}</Marquee.Item>}</For>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
