import { Accordion } from './accordion'
import { AccordionButton } from './accordion-button'
import { AccordionItem } from './accordion-item'
import { AccordionPanel } from './accordion-panel'

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
