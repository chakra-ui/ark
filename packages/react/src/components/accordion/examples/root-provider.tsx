import { Accordion, useAccordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

export const RootProvider = () => {
  const accordion = useAccordion({ defaultValue: ['React'] })

  return (
    <>
      <button onClick={() => accordion.setValue(['Vue'])}>Set to Vue</button>

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
    </>
  )
}
