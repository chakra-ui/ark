import { For } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const Reverse = () => (
  <Marquee.Root reverse>
    <Marquee.Viewport>
      <Marquee.Content>
        <For each={items}>{(item) => <Marquee.Item style={{ padding: '0 2rem' }}>{item}</Marquee.Item>}</For>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
