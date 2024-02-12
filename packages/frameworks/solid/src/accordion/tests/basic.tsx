import { For } from 'solid-js'
import { Accordion, type AccordionRootProps } from '../'

export const ComponentUnderTest = (props: AccordionRootProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Accordion.Root {...props}>
      <For each={items}>
        {(item) => (
          <Accordion.Item value={item.value} disabled={item.disabled}>
            <Accordion.ItemTrigger>
              {item.value} Trigger
              <Accordion.ItemIndicator>{'>'}</Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>{item.value} Content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </For>
    </Accordion.Root>
  )
}
