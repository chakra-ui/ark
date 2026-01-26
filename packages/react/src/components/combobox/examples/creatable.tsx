import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import styles from 'styles/combobox.module.css'

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
      { label: 'Bug', value: 'bug' },
      { label: 'Feature', value: 'feature' },
      { label: 'Enhancement', value: 'enhancement' },
      { label: 'Documentation', value: 'docs' },
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
      className={styles.Root}
      collection={collection}
      onInputValueChange={handleInputChange}
      onOpenChange={handleOpenChange}
      value={selectedValue}
      onValueChange={handleValueChange}
      allowCustomValue
    >
      <Combobox.Label className={styles.Label}>Label</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Bug" />
        <div className={styles.Indicators}>
          <Combobox.ClearTrigger className={styles.ClearTrigger}>
            <XIcon />
          </Combobox.ClearTrigger>
          <Combobox.Trigger className={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            {collection.items.map((item) => (
              <Combobox.Item className={styles.Item} key={item.value} item={item}>
                {isNewOptionValue(item.value) ? (
                  <Combobox.ItemText className={styles.ItemText}>+ Create "{item.label}"</Combobox.ItemText>
                ) : (
                  <Combobox.ItemText className={styles.ItemText}>
                    {item.label} {item.__new__ ? '(new)' : ''}
                  </Combobox.ItemText>
                )}
                <Combobox.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
