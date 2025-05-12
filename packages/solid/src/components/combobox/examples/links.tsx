import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { For, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const Links = () => {
  const [items, setItems] = createSignal(frameworks)

  const collection = createMemo(() => createListCollection({ items: items() }))

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(frameworks.filter((item) => item.label.toLowerCase().includes(details.inputValue.toLowerCase())))
  }

  return (
    <Combobox.Root collection={collection()} onInputValueChange={handleInputChange} selectionBehavior="preserve">
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item item={item} asChild={(props) => <a href={item.href} {...props} />}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
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
