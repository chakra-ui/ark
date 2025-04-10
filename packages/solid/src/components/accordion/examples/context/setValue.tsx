import { Accordion } from '@ark-ui/solid/accordion'
import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const ContextSetValue = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      <Accordion.Context>
        {(context) => <button onClick={() => context().setValue(['Vue'])}>Select Vue</button>}
      </Accordion.Context>
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
    </Accordion.Root>
  )
}
