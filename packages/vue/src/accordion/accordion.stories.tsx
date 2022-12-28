import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './index'

export const Basic = () => (
  <Accordion defaultValue="panel-2" collapsible>
    <AccordionItem value="panel-1" disabled>
      <AccordionTrigger>
        <button>Panel 1 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 1</AccordionContent>
    </AccordionItem>
    <AccordionItem value="panel-2">
      <AccordionTrigger>
        <button>Panel 2 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 2</AccordionContent>
    </AccordionItem>
    <AccordionItem value="panel-3">
      <AccordionTrigger>
        <button>Panel 3 trigger</button>
      </AccordionTrigger>
      <AccordionContent>Much content to fit here 3</AccordionContent>
    </AccordionItem>
  </Accordion>
)
