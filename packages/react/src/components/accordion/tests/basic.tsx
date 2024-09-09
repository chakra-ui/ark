import { Accordion } from '../'

export const ComponentUnderTest = (props: Accordion.RootProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Accordion.Root {...props}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item.value} disabled={item.disabled}>
          <Accordion.ItemTrigger>
            {item.value} Trigger
            <Accordion.ItemIndicator>{'>'}</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.value} Content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
