import { Accordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'

export const ItemContext = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      {['React', 'Solid', 'Vue', 'Svelte'].map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>
            What is {item}?
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
            <Accordion.ItemContext>
              {(context) => (
                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                  <span>Expanded: {String(context.expanded)}</span>
                  <span>Focused: {String(context.focused)}</span>
                  <span>Disabled: {String(context.disabled)}</span>
                </div>
              )}
            </Accordion.ItemContext>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} is a JavaScript library for building user interfaces.</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
