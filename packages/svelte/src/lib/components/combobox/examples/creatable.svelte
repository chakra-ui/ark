<script lang="ts">
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import { tick } from 'svelte'

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

  let selectedValue: string[] = $state([])
  let inputValue: string = $state('')

  const handleInputChange = ({ inputValue: newInputValue, reason }: Combobox.InputValueChangeDetails) => {
    if (reason === 'input-change' || reason === 'item-select') {
      if (isValidNewOption(newInputValue)) {
        upsert(NEW_OPTION_VALUE, createNewOption(newInputValue))
      } else if (newInputValue.trim().length === 0) {
        remove(NEW_OPTION_VALUE)
      }
      filter(newInputValue)
    }
    inputValue = newInputValue
  }

  const handleOpenChange = ({ reason }: Combobox.OpenChangeDetails) => {
    if (reason === 'trigger-click') {
      filter('')
    }
  }

  const handleValueChange = async ({ value }: Combobox.ValueChangeDetails) => {
    await tick()
    selectedValue = replaceNewOptionValue(value, inputValue)
    if (value.includes(NEW_OPTION_VALUE)) {
      console.log('New Option Created', inputValue)
      update(NEW_OPTION_VALUE, getNewOptionData(inputValue))
    }
  }
</script>

<Combobox.Root
  {collection}
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
          {#each collection().items as item (item.value)}
            <Combobox.Item {item}>
              {#if isNewOptionValue(item.value)}
                <Combobox.ItemText>+ Create "{item.label}"</Combobox.ItemText>
              {:else}
                <Combobox.ItemText>
                  {item.label}
                  {item.__new__ ? NEW_OPTION_VALUE : ''}
                </Combobox.ItemText>
              {/if}
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
