import type { Meta } from '@storybook/react'
import { ChevronDownIcon, ChevronsDownUpIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Select } from '../'
import { Portal } from '../../portal'
import './select.css'

type SelectType = typeof Select

const meta: Meta<SelectType> = {
  title: 'Select',
  component: Select,
}

export default meta

export const Basic = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item} item={item}>
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Advanced = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Multiple = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items} multiple>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Controlled = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const [_, setSelectedItems] = useState<Item[]>([])

  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]

  return (
    <Select.Root items={items} onValueChange={(e) => setSelectedItems(e.items)}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
              {items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const FormLibrary = () => {
  type Inputs = {
    framework: string
  }
  const items = ['React', 'Solid', 'Vue']
  const { control, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="framework"
        control={control}
        render={({ field }) => (
          <Select.Root onValueChange={(e) => field.onChange(e?.value)} items={items}>
            <Select.Label>Framework</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select a Framework" />
                <Select.Indicator>
                  <ChevronsDownUpIcon />
                </Select.Indicator>
              </Select.Trigger>
              <Select.ClearTrigger>Clear</Select.ClearTrigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup id="framework">
                  <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
                  {items.map((item) => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
