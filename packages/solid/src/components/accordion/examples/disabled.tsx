import { Index } from 'solid-js'
import { Accordion } from '../..'

export const Disabled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()} disabled={item() === 'panel-2'}>
            <Accordion.ItemTrigger>{item()} trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
