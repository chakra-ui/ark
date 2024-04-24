import { ChevronDownIcon } from 'lucide-react'
import { Accordion } from '../..'

export const LazyMount = () => {
  return (
    <Accordion.Root lazyMount collapsible>
      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item
          key={item}
          value={item}
          lazyMount={false}
          onExitComplete={() => alert('exit')}
        >
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
