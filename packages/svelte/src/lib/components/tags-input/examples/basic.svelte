<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/tags-input.module.css'
</script>

<TagsInput.Root class={styles.Root}>
  <TagsInput.Context>
    {#snippet render(tagsInput)}
      <TagsInput.Label class={styles.Label}>Frameworks</TagsInput.Label>
      <TagsInput.Control class={styles.Control}>
        {#each tagsInput().value as value, index (index)}
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
</TagsInput.Root>
