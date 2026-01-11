<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import { createForm } from '@tanstack/svelte-form'
  import styles from 'styles/select.module.css'
  import button from 'styles/button.module.css'

  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
    ],
  })

  const form = createForm(() => ({
    defaultValues: {
      framework: 'solid',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  }))

  const formData = $derived(form.state.values)
</script>

<div style="margin-bottom: 1rem;">Value is {formData.framework}</div>

<form
  onsubmit={(e) => {
    e.preventDefault()
    form.handleSubmit()
  }}
>
  <form.Field name="framework">
    {#snippet children(field)}
      {@const state = field.state}
      <Select.Root
        class={styles.Root}
        collection={frameworks}
        value={state.value ? [state.value] : []}
        invalid={state.meta.errors.length > 0}
        name={field.name}
        onValueChange={(details) => {
          field.handleChange(details.value[0])
        }}
      >
        <Select.Label class={styles.Label}>Framework</Select.Label>
        <Select.Control class={styles.Control}>
          <Select.Trigger class={styles.Trigger}>
            <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
            <Select.Indicator class={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </Select.Trigger>
          <Select.ClearTrigger class={styles.ClearTrigger}>Clear</Select.ClearTrigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content class={styles.Content}>
              <Select.ItemGroup class={styles.ItemGroup}>
                <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                {#each frameworks.items as item}
                  <Select.Item class={styles.Item} {item}>
                    <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
                    <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                  </Select.Item>
                {/each}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
    {/snippet}
  </form.Field>
  <button class={button.Root} style="margin-top: 1rem;" type="submit">Submit</button>
</form>
