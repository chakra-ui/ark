import { ChevronDownIcon } from 'lucide-react'
import { Accordion } from '../..'

export const Example = () => {
  return (
    <Accordion.Root lazyMount unmountOnExit>
      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item key={item} value={item} onExitComplete={() => alert('exit')}>
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
