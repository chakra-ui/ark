import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/tags-input.module.css'

export const Delimiter = () => {
  return (
    <TagsInput.Root delimiter="," class={styles.Root}>
      <TagsInput.Context>
        {(api) => (
          <>
            <TagsInput.Label class={styles.Label}>Frameworks</TagsInput.Label>
            <TagsInput.Control class={styles.Control}>
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInput.Item index={index} value={value()} class={styles.Item}>
                    <TagsInput.ItemPreview class={styles.ItemPreview}>
                      <TagsInput.ItemText class={styles.ItemText}>{value()}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger class={styles.ItemDeleteTrigger}>
                        <XIcon />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput class={styles.ItemInput} />
                  </TagsInput.Item>
                )}
              </Index>
              <TagsInput.Input placeholder="Add Framework" class={styles.Input} />
              <TagsInput.ClearTrigger class={styles.ClearTrigger}>
                <XIcon />
              </TagsInput.ClearTrigger>
            </TagsInput.Control>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
