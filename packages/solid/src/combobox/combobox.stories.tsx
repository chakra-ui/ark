import { createSignal, For } from 'solid-js'
import { Portal } from 'solid-js/web'
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
} from '.'

const comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue', disabled: true },
  { label: 'AngularJS', value: 'angular' },
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
    <Combobox onInputChange={handleInputChange}>
      {(context) => (
        <>
          <ComboboxLabel>JS Frameworks</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger>
              <button>▼</button>
            </ComboboxTrigger>
          </ComboboxControl>
          {context().isInputValueEmpty && !context().isOpen && (
            <div>Give me you favorite framework!</div>
          )}
          <Portal>
            <ComboboxPositioner>
              <ComboboxContent>
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
              </ComboboxContent>
            </ComboboxPositioner>
          </Portal>
        </>
      )}
    </Combobox>
  )
}
