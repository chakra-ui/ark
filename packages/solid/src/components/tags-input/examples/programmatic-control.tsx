import { TagsInput, useTagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/tags-input.module.css'

export const ProgrammaticControl = () => {
  const tagsInput = useTagsInput()

  return (
    <div class="stack">
      <div>
        <button type="button" class={button.Root} onClick={() => tagsInput().addValue('React')}>
          Add React
        </button>
        <button type="button" class={button.Root} onClick={() => tagsInput().addValue('Solid')}>
          Add Solid
        </button>
        <button type="button" class={button.Root} onClick={() => tagsInput().setValue(['Vue', 'Svelte'])}>
          Set to Vue & Svelte
        </button>
        <button type="button" class={button.Root} onClick={() => tagsInput().clearValue()}>
          Clear All
        </button>
      </div>

      <TagsInput.RootProvider value={tagsInput} class={styles.Root}>
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
      </TagsInput.RootProvider>
    </div>
  )
}
