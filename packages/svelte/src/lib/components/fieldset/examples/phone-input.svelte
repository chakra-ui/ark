<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import field from 'styles/field.module.css'
  import styles from 'styles/fieldset.module.css'
  import select from 'styles/select.module.css'

  const extensions = createListCollection({
    items: [
      { label: '+1', value: '+1' },
      { label: '+44', value: '+44' },
      { label: '+49', value: '+49' },
      { label: '+41', value: '+41' },
    ],
  })

  let input: HTMLInputElement | null = null

  const focusInput = () => {
    setTimeout(() => {
      input?.focus()
    })
  }
</script>

<Fieldset.Root class={styles.Root}>
  <Fieldset.Legend class={styles.Legend} onclick={focusInput}>Mobile Number</Fieldset.Legend>

  <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
    <Field.Root>
      <Select.Root class={select.Root} collection={extensions} defaultValue={['+1']} onValueChange={focusInput}>
        <Select.Control class={select.Control}>
          <Select.Trigger class={select.Trigger}>
            <Select.ValueText placeholder="Select" />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content class={select.Content}>
              {#each extensions.items as item}
                <Select.Item class={select.Item} {item}>
                  <Select.ItemText class={select.ItemText}>{item.label}</Select.ItemText>
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
    </Field.Root>

    <Field.Root class={field.Root}>
      <Field.Input class={field.Input} bind:ref={input} />
    </Field.Root>
  </div>
</Fieldset.Root>
