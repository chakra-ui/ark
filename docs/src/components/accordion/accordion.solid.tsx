/** @jsxImportSource solid-js */
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@atlas/solid-js'

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      {items.map((item) => (
        <AccordionItem value={item}>
          <AccordionButton>{item} trigger</AccordionButton>
          <AccordionPanel>{item} content</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
