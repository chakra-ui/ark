import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Accordion } from '../'
import './accordion.css'
import { ChevronDownIcon } from './icons'

type AccordionType = typeof Accordion

const meta: Meta<AccordionType> = {
  title: 'Accordion',
  component: Accordion,
}

export default meta

export const Basic = () => {
  return (
    <Accordion.Root value={['React']}>
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

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()}>
            {(api) => (
              <>
                <Accordion.ItemTrigger>{api().isOpen ? 'Close' : 'Open'}</Accordion.ItemTrigger>
                <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
              </>
            )}
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
export const Collapsible = () => {
  return (
    <Accordion.Root value={['React']} collapsible>
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

export const Multiple = () => {
  return (
    <Accordion.Root value={['React']} multiple>
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

export const Controlled = () => {
  const [value, setValue] = createSignal<string[]>([])
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root value={value()} onValueChange={(details) => setValue(details.value)}>
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemTrigger>{item()} trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root orientation="vertical">
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()}>
            <Accordion.ItemTrigger>{item()} trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}

export const Disabled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      <Index each={items}>
        {(item) => (
          <Accordion.Item value={item()} disabled={item() === 'panel-2'}>
            <Accordion.ItemTrigger>{item()} trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>{item()} content</Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}
