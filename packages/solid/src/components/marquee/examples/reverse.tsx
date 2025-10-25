import { For } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const Reverse = () => (
  <Marquee.Root reverse>
    <Marquee.Viewport>
      <Marquee.Content>
        <For each={items}>{(item) => <div style={{ padding: '0 2rem' }}>{item}</div>}</For>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
