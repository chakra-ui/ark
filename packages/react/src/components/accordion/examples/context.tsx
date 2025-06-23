import { Accordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

export const Context = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      <Accordion.Context>
        {(context) => (
          <div>
            <span>Selected items: {context.value.join(', ')}</span>
            <span>Focused item: {context.focusedValue}</span>
            <button onClick={() => context.setValue(['React', 'Solid'])}>Set value</button>
          </div>
        )}
      </Accordion.Context>

      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>
            What is {item}?
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
