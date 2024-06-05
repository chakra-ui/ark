import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import { Accordion, useAccordion } from '../..'

export const Provider = () => {
  const accordion = useAccordion({
    defaultValue: ['React'],
    onValueChange: (details) => console.log(details),
  })

  return (
    <Accordion.RootProvider value={accordion}>
      <Index each={['React', 'Solid', 'Vue']}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemTrigger>
              What is {item()}?
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              {item()} is a JavaScript library for building user interfaces.
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.RootProvider>
  )
}
