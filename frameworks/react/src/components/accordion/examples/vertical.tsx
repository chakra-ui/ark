import { Accordion } from '../..'

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root orientation="vertical">
      {items.map((item) => (
        <Accordion.Item key={item} value={item} disabled={item === 'panel-2'}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
