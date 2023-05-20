import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '.'

type AccordionType = typeof Accordion

const meta: Meta<AccordionType> = {
  title: 'Accordion',
  component: Accordion,
}

export default meta

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion defaultValue="panel-1">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
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
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
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
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
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
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Uncontrolled = () => {
  return (
    <Accordion defaultValue="panel-2">
      <AccordionItem value="panel-1">
        <AccordionTrigger>Panel 1 trigger</AccordionTrigger>
        <AccordionContent>Panel 1 content</AccordionContent>
      </AccordionItem>

      <AccordionItem value="panel-2">
        <AccordionTrigger>Panel 2 trigger</AccordionTrigger>
        <AccordionContent>Panel 2 content</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState<string | string[] | null>(null)
  return (
    <Accordion value={value} onChange={(details) => setValue(details.value)}>
      {['panel-1', 'panel-2', 'panel-3'].map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const AccessItemState = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion defaultValue="panel-1">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          {(state) => (
            <>
              <AccordionTrigger>{state.isOpen ? 'Close' : 'Open'}</AccordionTrigger>
              <AccordionContent>{item} content</AccordionContent>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
