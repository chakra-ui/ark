import { For } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const WithEdges = () => (
  <Marquee.Root>
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        <For each={items}>{(item) => <div style={{ padding: '0 2rem' }}>{item}</div>}</For>
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
)
