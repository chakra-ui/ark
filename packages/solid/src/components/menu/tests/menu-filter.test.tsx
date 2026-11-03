import { useListCollection } from '@ark-ui/solid/collection'
import { useFilter } from '@ark-ui/solid/locale'
import { Menu } from '@ark-ui/solid/menu'
import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For, Show, createSignal } from 'solid-js'
import { axe } from 'vitest-axe'

const actions = [
  { label: 'New file', value: 'new-file' },
  { label: 'Save', value: 'save' },
  { label: 'Save as', value: 'save-as' },
  { label: 'Rename', value: 'rename' },
]

const FilterMenu = (props: Menu.RootProps) => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [query, setQuery] = createSignal('')
  const [checked, setChecked] = createSignal(false)
  const { collection, filter } = useListCollection({ initialItems: actions, filter: contains })

  const handleQueryChange = (value: string) => {
    setQuery(value)
    filter(value)
  }

  return (
    <Menu.Root composite={false} onOpenChange={(details) => !details.open && handleQueryChange('')} {...props}>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Input
            aria-label="Filter actions"
            value={query()}
            onInput={(event) => handleQueryChange(event.currentTarget.value)}
          />
          <Show when={collection().size === 0}>
            <div>No actions found</div>
          </Show>
          <Menu.List>
            <For each={collection().items}>{(item) => <Menu.Item value={item.value}>{item.label}</Menu.Item>}</For>
            <Menu.CheckboxItem value="offline" closeOnSelect={false} checked={checked()} onCheckedChange={setChecked}>
              <Menu.ItemText>Keep offline</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

const openMenu = async () => {
  await user.click(screen.getByRole('button', { name: 'Actions' }))
  const input = screen.getByRole('searchbox', { name: 'Filter actions' })
  await waitFor(() => expect(input).toHaveFocus())
  return input
}

const getHighlighted = () => document.querySelector<HTMLElement>('[role^="menuitem"][data-highlighted]') ?? undefined

describe('Menu / Filtering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(() => <FilterMenu />)
    await openMenu()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render a dialog that holds the search box and a menu list', async () => {
    render(() => <FilterMenu />)
    const input = await openMenu()

    const list = screen.getByRole('menu')
    expect(screen.getByRole('dialog')).toContainElement(input)
    expect(input).toHaveAttribute('aria-controls', list.id)
    expect(list).toHaveAccessibleName('Actions')
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('should filter the items and navigate them from the input', async () => {
    const onSelect = vi.fn()
    render(() => <FilterMenu onSelect={onSelect} />)
    const input = await openMenu()

    await user.type(input, 'save')
    expect(screen.getAllByRole('menuitem').map((el) => el.textContent)).toEqual(['Save', 'Save as'])

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Save'))
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('aria-activedescendant', getHighlighted()?.id)

    await user.keyboard('[Enter]')
    expect(onSelect).toHaveBeenCalledWith({ value: 'save' })
  })

  it('should move between the input and the ends of the list', async () => {
    render(() => <FilterMenu />)
    await openMenu()

    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Keep offline'))

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))
  })

  it('should keep typing keys in the input', async () => {
    render(() => <FilterMenu />)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await user.type(input, 'save as')
    expect(input).toHaveValue('save as')
  })

  it('should clear a highlight that the query filters out', async () => {
    render(() => <FilterMenu />)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))

    await user.type(input, 'save')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())
  })

  it('should highlight the first match with autoHighlight', async () => {
    render(() => <FilterMenu autoHighlight />)
    const input = await openMenu()

    expect(getHighlighted()).toBeUndefined()
    await user.type(input, 'ren')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Rename'))
  })

  it('should report why the highlight changed', async () => {
    const onHighlightChange = vi.fn()
    render(() => <FilterMenu onHighlightChange={onHighlightChange} />)
    await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() =>
      expect(onHighlightChange).toHaveBeenLastCalledWith({ highlightedValue: 'new-file', reason: 'keyboard' }),
    )

    await user.hover(screen.getByRole('menuitem', { name: 'Rename' }))
    await waitFor(() =>
      expect(onHighlightChange).toHaveBeenLastCalledWith({ highlightedValue: 'rename', reason: 'pointer' }),
    )
  })

  it('should keep focus in the input when an item is pressed', async () => {
    render(() => <FilterMenu />)
    const input = await openMenu()

    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' }))
    expect(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' })).toHaveAttribute('aria-checked', 'true')
    expect(input).toHaveFocus()
  })

  it('should close and return focus to the trigger on Shift+Tab', async () => {
    render(() => <FilterMenu />)
    await openMenu()

    await user.keyboard('{Shift>}[Tab]{/Shift}')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should reset the query when the menu closes', async () => {
    render(() => <FilterMenu />)
    const input = await openMenu()

    await user.type(input, 'save')
    await user.keyboard('[Escape]')
    await openMenu()
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getAllByRole('menuitem')).toHaveLength(4)
  })
})
