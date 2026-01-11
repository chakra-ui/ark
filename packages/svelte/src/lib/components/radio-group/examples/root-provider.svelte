<script lang="ts">
  import { RadioGroup, useRadioGroup } from '@ark-ui/svelte/radio-group'
  import button from 'styles/button.module.css'
  import styles from 'styles/radio-group.module.css'

  const frameworks = ['React', 'Solid', 'Vue']

  const id = $props.id()
  const radioGroup = useRadioGroup({ id, defaultValue: 'React' })
</script>

<div class="stack">
  <RadioGroup.RootProvider class={styles.Root} value={radioGroup}>
    <RadioGroup.Label class={styles.Label}>Framework</RadioGroup.Label>
    {#each frameworks as framework}
      <RadioGroup.Item class={styles.Item} value={framework}>
        <RadioGroup.ItemControl class={styles.ItemControl} />
        <RadioGroup.ItemText class={styles.ItemText}>{framework}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    {/each}
  </RadioGroup.RootProvider>

  <button class={button.Root} onclick={() => radioGroup().setValue('Solid')}>Set to Solid</button>
</div>
