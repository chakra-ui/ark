import { Accordion } from '@ark-ui/solid/accordion'
import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const ItemContext = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      <Index each={['React', 'Solid', 'Vue', 'Svelte']}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemTrigger>
              What is {item()}?
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
              <Accordion.ItemContext>
                {(context) => (
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <span>Expanded: {String(context().expanded)}</span>
                    <span>Focused: {String(context().focused)}</span>
                    <span>Disabled: {String(context().disabled)}</span>
                  </div>
                )}
              </Accordion.ItemContext>
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
