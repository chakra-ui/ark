import { ChevronDownIcon } from 'lucide-react'
import { Accordion, useAccordion } from '../..'

export const Provider = () => {
  const accordion = useAccordion({
    multiple: true,
    onValueChange: (details) => console.log(details),
  })

  return (
    <Accordion.RootProvider value={accordion}>
      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>
            What is {item}?
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {item} is a JavaScript library for building user interfaces.
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.RootProvider>
  )
}
