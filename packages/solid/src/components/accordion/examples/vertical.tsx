import { Accordion } from '@ark-ui/solid/accordion'
import { Index } from 'solid-js'

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root orientation="vertical">
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemTrigger>{item()} trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
