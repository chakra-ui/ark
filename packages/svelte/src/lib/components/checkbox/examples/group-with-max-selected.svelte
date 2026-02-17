<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ]
</script>

<Checkbox.Group class={styles.Group} defaultValue={['react']} maxSelectedValues={2} name="framework">
  {#each items as item (item.value)}
    <Checkbox.Root class={styles.Root} value={item.value}>
      <Checkbox.Control class={styles.Control}>
        <Checkbox.Indicator class={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label class={styles.Label}>{item.label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  {/each}
</Checkbox.Group>
