import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './basic.tsx'

const highlighted = () => document.querySelector('[role="option"][data-highlighted]')

describe('Command', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(() => <ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render the input as an expanded combobox', async () => {
    render(() => <ComponentUnderTest />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(5)
  })

  it('should filter items by text and keywords', async () => {
    render(() => <ComponentUnderTest />)
    const input = screen.getByRole('combobox')

    await user.type(input, 'zoom')
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1))
    expect(screen.getByRole('option', { name: 'Zoom in' })).toBeInTheDocument()
    expect(screen.queryByRole('group', { name: 'File' })).not.toBeInTheDocument()

    await user.clear(input)
    await user.type(input, 'write')
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1))
    expect(screen.getByRole('option', { name: 'Save' })).toBeInTheDocument()
  })

  it('should support a custom filter', async () => {
    render(() => <ComponentUnderTest filter={(items, query) => items.filter((item) => item.label.startsWith(query))} />)
    await user.type(screen.getByRole('combobox'), 'S')
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1))
  })

  it('should show the empty state when nothing matches', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.queryByText('No results')).not.toBeInTheDocument()

    await user.type(screen.getByRole('combobox'), 'xyz')
    await waitFor(() => expect(screen.getByText('No results')).toBeInTheDocument())
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })

  it('should navigate with the keyboard and skip disabled items', async () => {
    render(() => <ComponentUnderTest />)
    const input = screen.getByRole('combobox')
    await user.click(input)

    await user.keyboard('{Home}')
    await waitFor(() => expect(highlighted()).toHaveTextContent('New file'))
    expect(input).toHaveAttribute('aria-activedescendant', highlighted()?.id)

    await user.keyboard('{ArrowDown}{ArrowDown}')
    await waitFor(() => expect(highlighted()).toHaveTextContent('Zoom in'))

    await user.keyboard('{End}')
    await waitFor(() => expect(highlighted()).toHaveTextContent('Theme'))
    expect(input).toHaveFocus()
  })

  it('should call onSelect with the highlighted item on Enter', async () => {
    const onSelect = vi.fn()
    render(() => <ComponentUnderTest onSelect={onSelect} />)
    const input = screen.getByRole('combobox')

    await user.type(input, 'sav')
    await waitFor(() => expect(highlighted()).toHaveTextContent('Save'))
    await user.keyboard('{Enter}')

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'save' }))
    expect(input).toHaveValue('sav')

    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledTimes(2)
  })

  it('should call onSelect when an item is clicked', async () => {
    const onSelect = vi.fn()
    render(() => <ComponentUnderTest onSelect={onSelect} />)

    await user.click(screen.getByRole('option', { name: 'Zoom in' }))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ itemValue: 'zoom-in' }))
  })

  it('should open the page of an item and go back with Backspace', async () => {
    const onSelect = vi.fn()
    const onPageChange = vi.fn()
    render(() => <ComponentUnderTest onSelect={onSelect} onPageChange={onPageChange} />)
    const input = screen.getByRole('combobox')

    await user.type(input, 'them')
    await waitFor(() => expect(highlighted()).toHaveTextContent('Theme'))
    await user.keyboard('{Enter}')

    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(2))
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument()
    expect(input).toHaveValue('')
    expect(onSelect).not.toHaveBeenCalled()
    expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 'theme' }))

    await user.keyboard('{Backspace}')
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(5))
    expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: null }))
    await waitFor(() => expect(highlighted()).toHaveTextContent('Theme'))
  })

  it('should search nested pages while typing', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.queryByRole('option', { name: 'Dark' })).not.toBeInTheDocument()

    await user.type(screen.getByRole('combobox'), 'dark')
    await waitFor(() => expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument())
  })
})
