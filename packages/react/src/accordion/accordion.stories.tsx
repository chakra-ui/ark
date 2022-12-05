import { useState } from 'react'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.'

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion defaultValue="panel-1">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Collapsible = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion collapsible>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Multiple = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion multiple>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Disabled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion multiple>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item} disabled={item === 'panel-2'}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string | string[] | null>(null)
  return (
    <Accordion value={value} onChange={(details) => setValue(details.value)}>
      {['panel-1', 'panel-2', 'panel-3'].map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
