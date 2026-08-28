import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/tags-input.module.css'

export const SanitizeValue = () => (
  <TagsInput.Root class={styles.Root} sanitizeValue={(value) => value.trim().toLowerCase()}>
    <TagsInput.Context>
      {(api) => (
        <>
          <TagsInput.Label class={styles.Label}>Email Addresses</TagsInput.Label>
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
            <TagsInput.Input placeholder="Add email" class={styles.Input} />
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
