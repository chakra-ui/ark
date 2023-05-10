import { For } from 'solid-js'
import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionItem } from './accordion-item'
import { AccordionTrigger } from './accordion-trigger'

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>
              <button>{item} trigger</button>
            </AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const Disabled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion multiple>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item} disabled={item === 'panel-2'}>
            <AccordionTrigger>
              <button>{item} trigger</button>
            </AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const ItemState = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            {(state) => (
              <>
                {state().isOpen ? 'Open' : 'Close'}
                <AccordionTrigger>
                  <button>{item} trigger</button>
                </AccordionTrigger>
                <AccordionContent>{item} content</AccordionContent>
              </>
            )}
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
