import { Accordion } from '@ark-ui/solid/accordion'
import { Index, createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal<string[]>([])
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root value={value()} onValueChange={(details) => setValue(details.value)}>
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
