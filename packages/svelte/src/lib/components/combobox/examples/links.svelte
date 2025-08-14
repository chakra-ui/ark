<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'React', href: 'https://react.dev', value: 'react' },
    { label: 'Solid', href: 'https://solidjs.com', value: 'solid' },
    { label: 'Vue', href: 'https://vuejs.org', value: 'vue' },
    { label: 'Svelte', href: 'https://svelte.dev', value: 'svelte' },
    { label: 'Angular', href: 'https://angular.io', value: 'angular' },
    { label: 'Ember', href: 'https://emberjs.com', value: 'ember' },
    { label: 'Backbone', href: 'https://backbonejs.org', value: 'backbone' },
    { label: 'Polymer', href: 'https://polymer-project.org', value: 'polymer' },
    { label: 'Preact', href: 'https://preactjs.com', value: 'preact' },
    { label: 'Alpine', href: 'https://alpinejs.dev', value: 'alpine' },
    { label: 'Lit', href: 'https://lit.dev', value: 'lit' },
    { label: 'Qwik', href: 'https://qwik.builder.io', value: 'qwik' },
    { label: 'Astro', href: 'https://astro.build', value: 'astro' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<div>
  <Combobox.Root {collection} onInputValueChange={handleInputChange} selectionBehavior="preserve">
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
    </Combobox.Control>
    <Portal>
      <Combobox.Positioner>
        <Combobox.Content>
          {#each collection().items as item (item.value)}
            <Combobox.Item {item}>
              {#snippet asChild(props)}
                <a {...props()} href={item.href}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </a>
              {/snippet}
            </Combobox.Item>
          {/each}
        </Combobox.Content>
      </Combobox.Positioner>
    </Portal>
  </Combobox.Root>
</div>
