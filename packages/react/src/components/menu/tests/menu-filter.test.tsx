import { useListCollection } from '@ark-ui/react/collection'
import { useFilter } from '@ark-ui/react/locale'
import { Menu } from '@ark-ui/react/menu'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { axe } from 'vitest-axe'

const actions = [
  { label: 'New file', value: 'new-file' },
  { label: 'Save', value: 'save' },
  { label: 'Save as', value: 'save-as' },
  { label: 'Rename', value: 'rename' },
]

const FilterMenu = (props: Menu.RootProps) => {
  const rootProps = props
  const { contains } = useFilter({ sensitivity: 'base' })
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState(false)
  const { collection, filter } = useListCollection({ initialItems: actions, filter: contains })

  const handleQueryChange = (value: string) => {
    setQuery(value)
    filter(value)
  }

  return (
    <Menu.Root composite={false} onOpenChange={(details) => !details.open && handleQueryChange('')} {...rootProps}>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Input
            aria-label="Filter actions"
            value={query}
            onChange={(event) => handleQueryChange(event.currentTarget.value)}
          />
          {collection.size === 0 && <div>No actions found</div>}
          <Menu.List>
            {collection.items.map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                {item.label}
              </Menu.Item>
            ))}
            <Menu.CheckboxItem value="offline" closeOnSelect={false} checked={checked} onCheckedChange={setChecked}>
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
    const { container } = render(<FilterMenu />)
    await openMenu()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render a dialog that holds the search box and a menu list', async () => {
    render(<FilterMenu />)
    const input = await openMenu()

    const list = screen.getByRole('menu')
    expect(screen.getByRole('dialog')).toContainElement(input)
    expect(input).toHaveAttribute('aria-controls', list.id)
    expect(list).toHaveAccessibleName('Actions')
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('should filter the items and navigate them from the input', async () => {
    const onSelect = vi.fn()
    render(<FilterMenu onSelect={onSelect} />)
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
    render(<FilterMenu />)
    await openMenu()

    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Keep offline'))

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))
  })

  it('should keep typing keys in the input', async () => {
    render(<FilterMenu />)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await user.type(input, 'save as')
    expect(input).toHaveValue('save as')
  })

  it('should clear a highlight that the query filters out', async () => {
    render(<FilterMenu />)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))

    await user.type(input, 'save')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())
  })

  it('should highlight the first match with autoHighlight', async () => {
    render(<FilterMenu autoHighlight />)
    const input = await openMenu()

    expect(getHighlighted()).toBeUndefined()
    await user.type(input, 'ren')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Rename'))
  })

  it('should highlight the first item on open with autoHighlight="always"', async () => {
    render(<FilterMenu autoHighlight="always" />)
    await openMenu()
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))
  })

  it('should report why the highlight changed', async () => {
    const onHighlightChange = vi.fn()
    render(<FilterMenu onHighlightChange={onHighlightChange} />)
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
    render(<FilterMenu />)
    const input = await openMenu()

    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' }))
    expect(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' })).toHaveAttribute('aria-checked', 'true')
    expect(input).toHaveFocus()
  })

  it('should close and return focus to the trigger on Shift+Tab', async () => {
    render(<FilterMenu />)
    await openMenu()

    await user.keyboard('{Shift>}[Tab]{/Shift}')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should reset the query when the menu closes', async () => {
    render(<FilterMenu />)
    const input = await openMenu()

    await user.type(input, 'save')
    await user.keyboard('[Escape]')
    await openMenu()
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getAllByRole('menuitem')).toHaveLength(4)
  })

  it('should mark only the highlighted item as selected in WebKit', async () => {
    render(<FilterMenu />)
    await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'New file' })).toHaveAttribute('aria-selected', 'true'),
    )

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Save' })).toHaveAttribute('aria-selected', 'true'))
    expect(screen.getByRole('menuitem', { name: 'New file' })).not.toHaveAttribute('aria-selected')
  })

  it('should not render aria-selected on the server', () => {
    const html = renderToString(<FilterMenu defaultOpen defaultHighlightedValue="save" />)
    expect(html).toContain('data-highlighted')
    expect(html).not.toContain('aria-selected')
  })
})
