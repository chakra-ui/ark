import { userEvent as user } from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './menu-filter.test.vue'

const openMenu = async () => {
  await user.click(screen.getByRole('button', { name: 'Actions' }))
  const input = screen.getByRole('searchbox', { name: 'Filter actions' })
  await waitFor(() => expect(input).toHaveFocus())
  return input
}

const getHighlighted = () => document.querySelector<HTMLElement>('[role^="menuitem"][data-highlighted]') ?? undefined

describe('Menu / Filtering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    await openMenu()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render a dialog that holds the search box and a menu list', async () => {
    render(ComponentUnderTest)
    const input = await openMenu()

    const list = screen.getByRole('menu')
    expect(screen.getByRole('dialog')).toContainElement(input)
    expect(input).toHaveAttribute('aria-controls', list.id)
    expect(list).toHaveAccessibleName('Actions')
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('should filter the items and navigate them from the input', async () => {
    const { emitted } = render(ComponentUnderTest)
    const input = await openMenu()

    await user.type(input, 'save')
    await waitFor(() =>
      expect(screen.getAllByRole('menuitem').map((el) => el.textContent?.trim())).toEqual(['Save', 'Save as']),
    )

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Save'))
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('aria-activedescendant', getHighlighted()?.id)

    await user.keyboard('[Enter]')
    await waitFor(() => expect(emitted('select')).toEqual([[{ value: 'save' }]]))
  })

  it('should move between the input and the ends of the list', async () => {
    render(ComponentUnderTest)
    await openMenu()

    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Keep offline'))

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))
  })

  it('should keep typing keys in the input', async () => {
    render(ComponentUnderTest)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await user.type(input, 'save as')
    expect(input).toHaveValue('save as')
  })

  it('should clear a highlight that the query filters out', async () => {
    render(ComponentUnderTest)
    const input = await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('New file'))

    await user.type(input, 'save')
    await waitFor(() => expect(getHighlighted()).toBeUndefined())
  })

  it('should highlight the first match with autoHighlight', async () => {
    render(ComponentUnderTest, { props: { autoHighlight: true } })
    const input = await openMenu()

    expect(getHighlighted()).toBeUndefined()
    await user.type(input, 'ren')
    await waitFor(() => expect(getHighlighted()).toHaveTextContent('Rename'))
  })

  it('should report why the highlight changed', async () => {
    const { emitted } = render(ComponentUnderTest)
    await openMenu()

    await user.keyboard('[ArrowDown]')
    await waitFor(() =>
      expect(emitted('highlightChange')?.at(-1)).toEqual([{ highlightedValue: 'new-file', reason: 'keyboard' }]),
    )

    await user.hover(screen.getByRole('menuitem', { name: 'Rename' }))
    await waitFor(() =>
      expect(emitted('highlightChange')?.at(-1)).toEqual([{ highlightedValue: 'rename', reason: 'pointer' }]),
    )
  })

  it('should keep focus in the input when an item is pressed', async () => {
    render(ComponentUnderTest)
    const input = await openMenu()

    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' }))
    await waitFor(() =>
      expect(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' })).toHaveAttribute('aria-checked', 'true'),
    )
    expect(input).toHaveFocus()
  })

  it('should close and return focus to the trigger on Shift+Tab', async () => {
    render(ComponentUnderTest)
    await openMenu()

    await user.keyboard('{Shift>}[Tab]{/Shift}')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should reset the query when the menu closes', async () => {
    render(ComponentUnderTest)
    const input = await openMenu()

    await user.type(input, 'save')
    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await openMenu()
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getAllByRole('menuitem')).toHaveLength(4)
  })
})
