import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './menu-filter.test.svelte'

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
    const onSelect = vi.fn()
    render(ComponentUnderTest, { props: { onSelect } })
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
    const onHighlightChange = vi.fn()
    render(ComponentUnderTest, { props: { onHighlightChange } })
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
    render(ComponentUnderTest)
    const input = await openMenu()

    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' }))
    expect(screen.getByRole('menuitemcheckbox', { name: 'Keep offline' })).toHaveAttribute('aria-checked', 'true')
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
    await openMenu()
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getAllByRole('menuitem')).toHaveLength(4)
  })
})
