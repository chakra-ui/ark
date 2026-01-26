import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest, TagsInputWithField } from './basic'

describe('TagsInput', () => {
  it.skip('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should allow to add a new item', async () => {
    render(<ComponentUnderTest />)

    const input = screen.getByPlaceholderText('Add tag')

    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()
  })

  it('should allow to add and delete a new item', async () => {
    render(<ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular[enter]')

    expect(screen.queryByText('angular')).toHaveAttribute('data-part', 'item-text')

    await user.type(input, '[ArrowLeft]', { delay: 10 })
    await waitFor(() => expect(screen.getByText('angular')).toHaveAttribute('data-highlighted', ''))

    await user.type(input, '[Delete]')
    expect(screen.queryByText('angular')).not.toBeInTheDocument()
  })

  it('should allow to modify an added item', async () => {
    render(<ComponentUnderTest />)

    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular[enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    expect(await screen.findByText('angular')).toHaveAttribute('data-scope', 'tags-input')

    await user.type(input, '[ArrowLeft]')
    await user.type(input, '[ArrowLeft]')
    await user.clear(input)
    await user.type(input, 'svelte')
    await user.keyboard('[Enter]')

    expect(await screen.findByText('svelte')).toBeInTheDocument()
  })

  it('should clear all item when clear all button is clicked', async () => {
    render(<ComponentUnderTest />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('solid')).toBeInTheDocument()
    expect(screen.getByText('vue')).toBeInTheDocument()
    await user.click(screen.getByText('Clear all'))

    expect(screen.queryByText('react')).not.toBeInTheDocument()
    expect(screen.queryByText('solid')).not.toBeInTheDocument()
    expect(screen.queryByText('vue')).not.toBeInTheDocument()
  })
})

describe('TagsInput / Field', () => {
  it('should set combobox as required', async () => {
    render(<TagsInputWithField required />)
    expect(screen.getAllByRole('textbox', { hidden: true })[1]).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(<TagsInputWithField disabled />)
    expect(screen.getAllByRole('textbox', { hidden: true })[1]).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(<TagsInputWithField readOnly />)
    expect(screen.getAllByRole('textbox', { hidden: true })[1]).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<TagsInputWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<TagsInputWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(<TagsInputWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<TagsInputWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
