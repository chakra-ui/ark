import { For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionItem } from './accordion-item'
import { AccordionTrigger } from './accordion-trigger'

const meta: Meta = {
  title: 'Accordion',
}

export default meta

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-1">
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger asChild>
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
            <AccordionTrigger asChild>
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
            {(itemState) => (
              <>
                {itemState().isOpen ? 'Open' : 'Close'}
                <AccordionTrigger asChild>
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
