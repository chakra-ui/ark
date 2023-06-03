import { For, createSignal } from 'solid-js'
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
    <Accordion>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const Initial = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value="panel-2">
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            {(api) => (
              <>
                <AccordionTrigger>{api().isOpen ? 'Close' : 'Open'}</AccordionTrigger>
                <AccordionContent>{item} content</AccordionContent>
              </>
            )}
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
export const Collapsible = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion collapsible>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const Multiple = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion multiple>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const Controlled = () => {
  const [value, setValue] = createSignal<string | string[] | null>(null)
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion value={value()} onChange={(details) => setValue(details.value)}>
      <For each={items}>
        {(item) => (
          <AccordionItem value={item}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion orientation="vertical">
      <For each={items}>
        {(item) => (
          <AccordionItem value={item} disabled={item === 'panel-2'}>
            <AccordionTrigger>{item} trigger</AccordionTrigger>
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
            <AccordionTrigger>{item} trigger</AccordionTrigger>
            <AccordionContent>{item} content</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
