<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
  import button from 'styles/button.module.css'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ]
</script>

<form
  onsubmit={(e) => {
    e.preventDefault()
    console.log(new FormData(e.currentTarget).getAll('framework'))
  }}
>
  <Checkbox.Group class={styles.Group} defaultValue={['react']} name="framework">
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
  <button class={button.Root} type="submit">Submit</button>
</form>
