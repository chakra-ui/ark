import { Marquee } from '@ark-ui/solid/marquee'
import { For } from 'solid-js'

const items = ['Apple', 'Banana', 'Cherry']

export const AutoFill = () => (
  <Marquee.Root autoFill spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        <For each={items}>{(item) => <Marquee.Item style={{ padding: '0 2rem' }}>{item}</Marquee.Item>}</For>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
