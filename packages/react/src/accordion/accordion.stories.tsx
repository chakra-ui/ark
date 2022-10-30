import type { Meta } from '@storybook/react'
import { Accordion } from './accordion'
import { AccordionButton } from './accordion-button'
import { AccordionItem } from './accordion-item'
import { AccordionPanel } from './accordion-panel'

export default {
  title: 'React/Accordion',
} as Meta

export const basic = () => {
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

export const collapsible = () => {
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

export const multiple = () => {
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

export const disabled = () => {
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
