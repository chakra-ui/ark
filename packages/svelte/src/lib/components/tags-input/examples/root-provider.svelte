<script lang="ts">
  import { TagsInput, useTagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tags-input.module.css'

  const id = $props.id()

  const tagsInput = useTagsInput({
    id,
    defaultValue: ['React', 'Svelte'],
  })
</script>

<div class="stack">
  <button class={button.Root} onclick={() => tagsInput().addValue('Vue')}>Add Vue</button>
  <button class={button.Root} onclick={() => tagsInput().clearValue()}>Clear All</button>

  <TagsInput.RootProvider value={tagsInput} class={styles.Root}>
    <TagsInput.Context>
      {#snippet render(api)}
        <TagsInput.Label class={styles.Label}>Frameworks</TagsInput.Label>
        <TagsInput.Control class={styles.Control}>
          {#each api().value as value, index (index)}
            <TagsInput.Item {index} {value} class={styles.Item}>
              <TagsInput.ItemPreview class={styles.ItemPreview}>
                <TagsInput.ItemText class={styles.ItemText}>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger class={styles.ItemDeleteTrigger}>
                  <XIcon />
                </TagsInput.ItemDeleteTrigger>
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput class={styles.ItemInput} />
            </TagsInput.Item>
          {/each}
          <TagsInput.Input placeholder="Add Framework" class={styles.Input} />
          <TagsInput.ClearTrigger class={styles.ClearTrigger}>
            <XIcon />
          </TagsInput.ClearTrigger>
        </TagsInput.Control>
      {/snippet}
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>

  <output>values: {JSON.stringify(tagsInput().value)}</output>
</div>
