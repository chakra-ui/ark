import { For, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionGroup,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxOptionProps,
  type ComboboxProps,
} from '.'
import './combobox.css'

const meta: Meta = {
  title: 'Combobox',
}

export default meta

const comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue' },
  { label: 'AngularJS', value: 'angular', disabled: true },
]

export const Basic = () => {
  const [options, setOptions] = createSignal(comboboxData)

  const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
    const filtered = comboboxData.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    )
    setOptions(filtered.length > 0 ? filtered : comboboxData)
  }

  return (
    <Combobox
      onOpen={() => {
        setOptions(comboboxData)
      }}
      onInputChange={handleInputChange}
    >
      <ComboboxLabel>JS Frameworks</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>▼</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxOptionGroup label="Javascript">
              <For each={options()}>
                {(option) => (
                  <ComboboxOption
                    label={option.label}
                    value={option.value}
                    disabled={option?.disabled}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
              </For>
            </ComboboxOptionGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
