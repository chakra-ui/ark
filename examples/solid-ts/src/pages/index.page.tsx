import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ark-ui/solid'

export function Page() {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      {items.map((item) => (
        <AccordionItem value={item}>
          <AccordionTrigger>
            <button>{item} trigger</button>
          </AccordionTrigger>
          <AccordionContent>{item} content</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
