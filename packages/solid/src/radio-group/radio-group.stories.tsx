import { For, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Radio, RadioControl, RadioGroup, RadioGroupLabel, RadioInput, RadioLabel } from '.'
import './radio-group.css'

const meta: Meta = {
  title: 'RadioGroup',
}

export default meta

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
]

export const Basic = () => {
  const [value, setValue] = createSignal('apple')
  return (
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel>Fruits: {value()}</RadioGroupLabel>
      <For each={options}>
        {(option) => (
          <Radio
            value={option.id}
            style={{ 'font-weight': option.id === value() ? 'bold' : 'inherit' }}
          >
            <RadioLabel>{option.label}</RadioLabel>
            <RadioInput />
            <RadioControl />
          </Radio>
        )}
      </For>
    </RadioGroup>
  )
}

export const Disabled = () => {
  const [value, setValue] = createSignal('apple')
  return (
    <RadioGroup onChange={({ value }) => setValue(value)}>
      <RadioGroupLabel>Fruits: {value()}</RadioGroupLabel>
      <For each={options}>
        {(option) => (
          <Radio
            value={option.id}
            disabled={option.id === 'mango'}
            style={{
              color: option.id === 'mango' ? 'lightgray' : 'inherit',
              'font-weight': option.id === value() ? 'bold' : 'inherit',
            }}
          >
            <RadioLabel>{option.label}</RadioLabel>
            <RadioInput />
            <RadioControl />
          </Radio>
        )}
      </For>
    </RadioGroup>
  )
}
