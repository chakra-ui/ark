import { For } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const Speed = () => (
  <div style={{ display: 'flex', 'flex-direction': 'column', gap: '2rem' }}>
    <div>
      <h3>Slow (25px/s)</h3>
      <Marquee.Root speed={25}>
        <Marquee.Viewport>
          <Marquee.Content>
            <For each={items}>{(item) => <Marquee.Item style={{ padding: '0 2rem' }}>{item}</Marquee.Item>}</For>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Normal (50px/s)</h3>
      <Marquee.Root speed={50}>
        <Marquee.Viewport>
          <Marquee.Content>
            <For each={items}>{(item) => <Marquee.Item style={{ padding: '0 2rem' }}>{item}</Marquee.Item>}</For>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Fast (100px/s)</h3>
      <Marquee.Root speed={100}>
        <Marquee.Viewport>
          <Marquee.Content>
            <For each={items}>{(item) => <Marquee.Item style={{ padding: '0 2rem' }}>{item}</Marquee.Item>}</For>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>
  </div>
)
