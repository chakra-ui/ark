import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@atlas/react'

export const ReactAccordion = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
