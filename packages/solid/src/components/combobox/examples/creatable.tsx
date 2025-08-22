import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { createSignal, For } from 'solid-js'
import { Portal } from 'solid-js/web'

interface Item {
  label: string
  value: string
  __new__?: boolean
}

const NEW_OPTION_VALUE = '[[new]]'
const createNewOption = (value: string): Item => ({ label: value, value: NEW_OPTION_VALUE })
const isNewOptionValue = (value: string) => value === NEW_OPTION_VALUE
const replaceNewOptionValue = (values: string[], value: string) =>
  values.map((v) => (v === NEW_OPTION_VALUE ? value : v))
const getNewOptionData = (inputValue: string): Item => ({ label: inputValue, value: inputValue, __new__: true })

export const Creatable = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter, upsert, update, remove } = useListCollection<Item>({
    initialItems: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
    filter: filterFn().contains,
  })

  const isValidNewOption = (inputValue: string) => {
    const exactOptionMatch =
      collection().items.filter((item) => item.label.toLowerCase() === inputValue.toLowerCase()).length > 0
    return !exactOptionMatch && inputValue.trim().length > 0
  }

  const [selectedValue, setSelectedValue] = createSignal<string[]>([])
  const [inputValue, setInputValue] = createSignal('')

  const handleInputChange = ({ inputValue: newInputValue, reason }: Combobox.InputValueChangeDetails) => {
    if (reason === 'input-change' || reason === 'item-select') {
      if (isValidNewOption(newInputValue)) {
        upsert(NEW_OPTION_VALUE, createNewOption(newInputValue))
      } else if (newInputValue.trim().length === 0) {
        remove(NEW_OPTION_VALUE)
      }
      filter(newInputValue)
    }
    setInputValue(newInputValue)
  }

  const handleOpenChange = ({ reason }: Combobox.OpenChangeDetails) => {
    if (reason === 'trigger-click') {
      filter('')
    }
  }

  const handleValueChange = ({ value }: Combobox.ValueChangeDetails) => {
    setSelectedValue(replaceNewOptionValue(value, inputValue()))
    if (value.includes(NEW_OPTION_VALUE)) {
      console.log('New Option Created', inputValue())
      update(NEW_OPTION_VALUE, getNewOptionData(inputValue()))
    }
  }

  return (
    <Combobox.Root
      collection={collection()}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
      value={selectedValue()}
      onValueChange={handleValueChange}
      allowCustomValue
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item item={item}>
                    {isNewOptionValue(item.value) ? (
                      <Combobox.ItemText>+ Create "{item.label}"</Combobox.ItemText>
                    ) : (
                      <Combobox.ItemText>
                        {item.label} {item.__new__ ? NEW_OPTION_VALUE : ''}
                      </Combobox.ItemText>
                    )}
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </For>
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
