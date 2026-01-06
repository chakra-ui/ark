<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
  import fieldset from 'styles/fieldset.module.css'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ]
</script>

<Fieldset.Root class={fieldset.Root}>
  <Fieldset.Legend class={fieldset.Legend}>Select frameworks</Fieldset.Legend>
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
  <Fieldset.HelperText class={fieldset.HelperText}>Choose your preferred frameworks</Fieldset.HelperText>
</Fieldset.Root>
