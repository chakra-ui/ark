import { useState } from 'react'
import { Accordion } from '../..'

export const Controlled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  const [value, setValue] = useState<string[]>([])
  return (
    <Accordion.Root value={value} onValueChange={(details) => setValue(details.value)}>
      {items.map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
