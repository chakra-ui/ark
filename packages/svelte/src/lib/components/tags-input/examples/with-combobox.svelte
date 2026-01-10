<script lang="ts">
  import { Combobox, useCombobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import { TagsInput, useTagsInput } from '@ark-ui/svelte/tags-input'
  import { CheckIcon, XIcon } from 'lucide-svelte'
  import combobox from 'styles/combobox.module.css'
  import styles from 'styles/tags-input.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js', 'Astro', 'Nuxt'],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const uid = $props.id()

  const tagsInput = useTagsInput({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
  })

  const comboboxApi = useCombobox({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    get collection() {
      return collection()
    },
    onInputValueChange(details) {
      filter(details.inputValue)
    },
    value: [],
    allowCustomValue: true,
    onValueChange: (details) => {
      if (details.value[0]) {
        tagsInput().addValue(details.value[0])
      }
    },
    selectionBehavior: 'clear',
  })
</script>

<Combobox.RootProvider value={comboboxApi}>
  <TagsInput.RootProvider class={styles.Root} value={tagsInput}>
    <TagsInput.Label class={styles.Label}>Frameworks</TagsInput.Label>
    <TagsInput.Control class={styles.Control}>
      {#each tagsInput().value as value, index (index)}
        <TagsInput.Item {index} {value} class={styles.Item}>
          <TagsInput.ItemPreview class={styles.ItemPreview}>
            <TagsInput.ItemText class={styles.ItemText}>{value}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger class={styles.ItemDeleteTrigger}><XIcon /></TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput class={styles.ItemInput} />
        </TagsInput.Item>
      {/each}
      <Combobox.Input asChild>
        {#snippet child(inputProps)}
          <TagsInput.Input placeholder="Add Framework" class={styles.Input} {...inputProps} />
        {/snippet}
      </Combobox.Input>
      <TagsInput.ClearTrigger class={styles.ClearTrigger}><XIcon /></TagsInput.ClearTrigger>
    </TagsInput.Control>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>

  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={combobox.Content}>
        <Combobox.Empty class={combobox.Item}>No frameworks found</Combobox.Empty>
        {#each collection().items as item (item)}
          <Combobox.Item class={combobox.Item} {item}>
            <Combobox.ItemText class={combobox.ItemText}>{item}</Combobox.ItemText>
            <Combobox.ItemIndicator class={combobox.ItemIndicator}><CheckIcon /></Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.RootProvider>
