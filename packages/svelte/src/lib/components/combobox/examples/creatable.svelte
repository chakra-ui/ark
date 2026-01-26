<script lang="ts">
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import { tick } from 'svelte'
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

  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter, upsert, update, remove } = useListCollection<Item>({
    initialItems: [
      { label: 'Bug', value: 'bug' },
      { label: 'Feature', value: 'feature' },
      { label: 'Enhancement', value: 'enhancement' },
      { label: 'Documentation', value: 'docs' },
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
  class={styles.Root}
  {collection}
  onInputValueChange={handleInputChange}
  onOpenChange={handleOpenChange}
  value={selectedValue}
  onValueChange={handleValueChange}
  allowCustomValue
>
  <Combobox.Label class={styles.Label}>Label</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. Bug" />
    <div class={styles.Indicators}>
      <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        {#each collection().items as item (item.value)}
          <Combobox.Item class={styles.Item} {item}>
            {#if isNewOptionValue(item.value)}
              <Combobox.ItemText class={styles.ItemText}>+ Create "{item.label}"</Combobox.ItemText>
            {:else}
              <Combobox.ItemText class={styles.ItemText}>
                {item.label}
                {item.__new__ ? '(new)' : ''}
              </Combobox.ItemText>
            {/if}
            <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
