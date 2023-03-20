import { useState } from 'react'
import { Portal } from '..'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
  type ComboboxOptionProps,
  type ComboboxProps,
} from './'
import './combobox.css'

const comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue', disabled: true },
  { label: 'AngularJS', value: 'angular' },
]

export const Basic = () => {
  const [options, setOptions] = useState(comboboxData)

  const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
    const filtered = comboboxData.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    )
    setOptions(filtered.length > 0 ? filtered : comboboxData)
  }

  return (
    <Combobox onInputChange={handleInputChange}>
      {({ isInputValueEmpty, isOpen }) => (
        <>
          <ComboboxLabel>JS Frameworks</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger>
              <button>▼</button>
            </ComboboxTrigger>
          </ComboboxControl>
          {isInputValueEmpty && !isOpen && <div>Give me you favorite framework!</div>}
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
                {options.map((item, index) => (
                  <ComboboxOption
                    key={`${item.value}:${index}`}
                    label={item.label}
                    value={item.value}
                    disabled={item?.disabled}
                  >
                    {item.label}
                  </ComboboxOption>
                ))}
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </>
      )}
    </Combobox>
  )
}
