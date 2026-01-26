<script lang="ts">
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { RadioGroup } from '@ark-ui/svelte/radio-group'
  import fieldset from 'styles/fieldset.module.css'
  import styles from 'styles/radio-group.module.css'

  const frameworks = ['React', 'Solid', 'Vue']
</script>

<Fieldset.Root class={fieldset.Root}>
  <Fieldset.Legend class={fieldset.Legend}>Select a framework</Fieldset.Legend>
  <RadioGroup.Root class={styles.Root}>
    {#each frameworks as framework}
      <RadioGroup.Item class={styles.Item} value={framework}>
        <RadioGroup.ItemControl class={styles.ItemControl} />
        <RadioGroup.ItemText class={styles.ItemText}>{framework}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    {/each}
  </RadioGroup.Root>
  <Fieldset.HelperText class={fieldset.HelperText}>Choose your preferred framework</Fieldset.HelperText>
  <Fieldset.ErrorText class={fieldset.ErrorText}>Please select a framework</Fieldset.ErrorText>
</Fieldset.Root>
