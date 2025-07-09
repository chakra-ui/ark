<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'

  const extensions = createListCollection({
    items: ['+1', '+44', '+49', '+41'],
  })

  let input: HTMLInputElement | null = null

  const focusInput = () => {
    setTimeout(() => {
      input?.focus()
    })
  }
</script>

<Fieldset.Root>
  <Fieldset.Legend onclick={focusInput}>Mobile Number</Fieldset.Legend>

  <div style="display: flex; align-items: flex-start;">
    <Field.Root>
      <Select.Root collection={extensions} defaultValue={['+1']} onValueChange={focusInput}>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select" />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {#each extensions.items as item}
                <Select.Item {item}>
                  <Select.ItemText>{item}</Select.ItemText>
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
    </Field.Root>

    <Field.Root>
      <Field.Input bind:ref={input} />
    </Field.Root>
  </div>
</Fieldset.Root>
