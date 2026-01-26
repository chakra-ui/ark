import { Combobox, useCombobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { TagsInput, useTagsInput } from '@ark-ui/react/tags-input'
import { CheckIcon, XIcon } from 'lucide-react'
import { useId } from 'react'
import combobox from 'styles/combobox.module.css'
import styles from 'styles/tags-input.module.css'

export const WithCombobox = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Preact', 'Next.js', 'Astro', 'Nuxt'],
    filter: contains,
  })

  const uid = useId()

  const tagsInput = useTagsInput({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
  })

  const comboboxApi = useCombobox({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    collection,
    onInputValueChange(details) {
      filter(details.inputValue)
    },
    value: [],
    allowCustomValue: true,
    onValueChange: (details) => {
      if (details.value[0]) {
        tagsInput.addValue(details.value[0])
      }
    },
    selectionBehavior: 'clear',
  })

  return (
    <Combobox.RootProvider value={comboboxApi}>
      <TagsInput.RootProvider className={styles.Root} value={tagsInput}>
        <TagsInput.Label className={styles.Label}>Frameworks</TagsInput.Label>
        <TagsInput.Control className={styles.Control}>
          {tagsInput.value.map((value, index) => (
            <TagsInput.Item key={index} index={index} value={value} className={styles.Item}>
              <TagsInput.ItemPreview className={styles.ItemPreview}>
                <TagsInput.ItemText className={styles.ItemText}>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger className={styles.ItemDeleteTrigger}>
                  <XIcon />
                </TagsInput.ItemDeleteTrigger>
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput className={styles.ItemInput} />
            </TagsInput.Item>
          ))}
          <Combobox.Input asChild>
            <TagsInput.Input placeholder="Add Framework" className={styles.Input} />
          </Combobox.Input>
          <TagsInput.ClearTrigger className={styles.ClearTrigger}>
            <XIcon />
          </TagsInput.ClearTrigger>
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={combobox.Content}>
            <Combobox.Empty className={combobox.Item}>No frameworks found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item className={combobox.Item} key={item} item={item}>
                <Combobox.ItemText className={combobox.ItemText}>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator className={combobox.ItemIndicator}>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}
