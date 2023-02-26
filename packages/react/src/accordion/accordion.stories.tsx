import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '.'

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion defaultValue="panel-1">
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
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
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
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
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
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
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
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
        <AccordionTrigger>
          <button>Panel 1 trigger</button>
        </AccordionTrigger>
        <AccordionContent>Panel 1 content</AccordionContent>
      </AccordionItem>

      <AccordionItem value="panel-2">
        <AccordionTrigger>
          <button>Panel 2 trigger</button>
        </AccordionTrigger>
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
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
