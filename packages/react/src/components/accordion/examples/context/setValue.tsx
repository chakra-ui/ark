import { Accordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

export const ContextSetValue = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      <Accordion.Context>
        {(context) => <button onClick={() => context.setValue(['Vue'])}>Select Vue</button>}
      </Accordion.Context>
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
    </Accordion.Root>
  )
}
