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
    <Accordion>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Initial = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion defaultValue="panel-2">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          {(api) => (
            <>
              <AccordionTrigger>{api.isOpen ? 'Close' : 'Open'}</AccordionTrigger>
              <AccordionContent>{item} content</AccordionContent>
            </>
          )}
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

export const Controlled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  const [value, setValue] = useState<string | string[] | null>(null)
  return (
    <Accordion value={value} onChange={(details) => setValue(details.value)}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>{item} trigger</AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion orientation="vertical">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item} disabled={item === 'panel-2'}>
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
