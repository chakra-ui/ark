import { type CollectionItem, Listbox, createListCollection } from '@ark-ui/react/listbox'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'

const ComponentUnderTest = (props: Omit<Listbox.RootProps<CollectionItem>, 'collection'>) => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'svelte', disabled: true },
      { label: 'Vue', value: 'vue' },
    ],
  })

  return (
    <Listbox.Root collection={collection} {...props}>
      <Listbox.Label>
        Select your Framework: <Listbox.ValueText />
      </Listbox.Label>
      <Listbox.Content>
        <Listbox.ItemGroup>
          <Listbox.ItemGroupLabel>JS Frameworks</Listbox.ItemGroupLabel>
          {collection.items.map((item) => (
            <Listbox.Item key={item.value} item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.ItemGroup>
      </Listbox.Content>
    </Listbox.Root>
  )
}

describe('Listbox', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render all available options', async () => {
    render(<ComponentUnderTest />)
    await screen.findByRole('option', { name: 'React' })
    await screen.findByRole('option', { name: 'Solid' })
    await screen.findByRole('option', { name: 'Vue' })
  })

  it('should render disabled items with appropriate attributes', async () => {
    render(<ComponentUnderTest />)

    const svelte = await screen.findByRole('option', { name: 'Svelte' })
    expect(svelte).toHaveAttribute('aria-disabled', 'true')
  })

  it.skip('should invoke onValueChange callback when an option is selected', async () => {
    const mock = vi.fn()
    render(<ComponentUnderTest onValueChange={mock} />)

    const option = await screen.findByRole('option', { name: 'React' })
    await user.click(option)
  })
})
