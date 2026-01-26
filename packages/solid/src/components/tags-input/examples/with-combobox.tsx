import { Combobox, useCombobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { TagsInput, useTagsInput } from '@ark-ui/solid/tags-input'
import { CheckIcon, XIcon } from 'lucide-solid'
import { For, createUniqueId } from 'solid-js'
import { Portal } from 'solid-js/web'
import combobox from 'styles/combobox.module.css'
import styles from 'styles/tags-input.module.css'

export const WithCombobox = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js', 'Astro', 'Nuxt'],
    filter: filterFn().contains,
  })

  const uid = createUniqueId()

  const tagsInput = useTagsInput({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
  })

  const comboboxApi = useCombobox({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    collection: collection(),
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

  return (
    <Combobox.RootProvider value={comboboxApi}>
      <TagsInput.RootProvider class={styles.Root} value={tagsInput}>
        <TagsInput.Label class={styles.Label}>Frameworks</TagsInput.Label>
        <TagsInput.Control class={styles.Control}>
          <For each={tagsInput().value}>
            {(value, index) => (
              <TagsInput.Item index={index()} value={value} class={styles.Item}>
                <TagsInput.ItemPreview class={styles.ItemPreview}>
                  <TagsInput.ItemText class={styles.ItemText}>{value}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger class={styles.ItemDeleteTrigger}>
                    <XIcon />
                  </TagsInput.ItemDeleteTrigger>
                </TagsInput.ItemPreview>
                <TagsInput.ItemInput class={styles.ItemInput} />
              </TagsInput.Item>
            )}
          </For>
          <Combobox.Input
            asChild={(props) => <TagsInput.Input placeholder="Add Framework" class={styles.Input} {...props()} />}
          />
          <TagsInput.ClearTrigger class={styles.ClearTrigger}>
            <XIcon />
          </TagsInput.ClearTrigger>
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={combobox.Content}>
            <Combobox.Empty class={combobox.Item}>No frameworks found</Combobox.Empty>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item class={combobox.Item} item={item}>
                  <Combobox.ItemText class={combobox.ItemText}>{item}</Combobox.ItemText>
                  <Combobox.ItemIndicator class={combobox.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}
