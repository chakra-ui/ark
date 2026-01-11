<script lang="ts">
  import { RadioGroup } from '@ark-ui/svelte/radio-group'
  import styles from 'styles/radio-group.module.css'

  const frameworks = ['React', 'Solid', 'Vue']
</script>

<RadioGroup.Root class={styles.Root} defaultValue="React" disabled>
  <RadioGroup.Label class={styles.Label}>Framework</RadioGroup.Label>
  {#each frameworks as framework}
    <RadioGroup.Item class={styles.Item} value={framework}>
      <RadioGroup.ItemControl class={styles.ItemControl} />
      <RadioGroup.ItemText class={styles.ItemText}>{framework}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
