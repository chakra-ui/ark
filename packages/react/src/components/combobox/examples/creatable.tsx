import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'
import { flushSync } from 'react-dom'

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
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter, upsert, update, remove } = useListCollection<Item>({
    initialItems: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
    filter: contains,
  })

  const isValidNewOption = (inputValue: string) => {
    const exactOptionMatch = collection.filter((item) => item.toLowerCase() === inputValue.toLowerCase()).size > 0
    return !exactOptionMatch && inputValue.trim().length > 0
  }

  const [selectedValue, setSelectedValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = ({ inputValue, reason }: Combobox.InputValueChangeDetails) => {
    if (reason === 'input-change' || reason === 'item-select') {
      flushSync(() => {
        if (isValidNewOption(inputValue)) {
          upsert(NEW_OPTION_VALUE, createNewOption(inputValue))
        } else if (inputValue.trim().length === 0) {
          remove(NEW_OPTION_VALUE)
        }
      })
      filter(inputValue)
    }
    setInputValue(inputValue)
  }

  const handleOpenChange = ({ reason }: Combobox.OpenChangeDetails) => {
    if (reason === 'trigger-click') {
      filter('')
    }
  }

  const handleValueChange = ({ value }: Combobox.ValueChangeDetails) => {
    setSelectedValue(replaceNewOptionValue(value, inputValue))
    if (value.includes(NEW_OPTION_VALUE)) {
      console.log('New Option Created', inputValue)
      update(NEW_OPTION_VALUE, getNewOptionData(inputValue))
    }
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
      value={selectedValue}
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
              {collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  {isNewOptionValue(item.value) ? (
                    <Combobox.ItemText>+ Create "{item.label}"</Combobox.ItemText>
                  ) : (
                    <Combobox.ItemText>
                      {item.label} {item.__new__ ? NEW_OPTION_VALUE : ''}
                    </Combobox.ItemText>
                  )}
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
