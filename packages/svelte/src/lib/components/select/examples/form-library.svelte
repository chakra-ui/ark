<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { createForm } from '@tanstack/svelte-form'

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

<div>Value is {formData.framework}</div>

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
        collection={frameworks}
        value={state.value ? [state.value] : []}
        invalid={state.meta.errors.length > 0}
        name={field.name}
        onValueChange={(details) => {
          field.handleChange(details.value[0])
        }}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                {#each frameworks.items as item}
                  <Select.Item {item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
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
  <button type="submit">Submit</button>
</form>
