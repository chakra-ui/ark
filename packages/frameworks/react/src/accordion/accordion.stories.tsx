import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Accordion } from './'
import './accordion.css'

type AccordionType = typeof Accordion

const meta: Meta<AccordionType> = {
  title: 'Accordion',
  component: Accordion,
}

export default meta

export const Basic = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>
            {item} Trigger
            <Accordion.ItemIndicator>{'>'}</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Initial = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root defaultValue={['panel-2']}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const RenderProp = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          {(api) => (
            <>
              <Accordion.ItemTrigger>{api.isOpen ? 'Close' : 'Open'}</Accordion.ItemTrigger>
              <Accordion.ItemContent>{item} content</Accordion.ItemContent>
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
export const Collapsible = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root collapsible>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Multiple = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root multiple>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Controlled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  const [value, setValue] = useState<string[]>([])
  return (
    <Accordion.Root value={value} onValueChange={(details) => setValue(details.value)}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Vertical = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root orientation="vertical">
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item} disabled={item === 'panel-2'}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export const Disabled = () => {
  const items = ['panel-1', 'panel-2', 'panel-3']
  return (
    <Accordion.Root>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item} disabled={item === 'panel-2'}>
          <Accordion.ItemTrigger>{item} trigger</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item} content</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
