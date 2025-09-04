import { render, screen } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Select', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render select with placeholder', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Select a Framework')).toBeInTheDocument()
    expect(screen.getByText('Framework')).toBeInTheDocument()
  })

  it('should open dropdown when clicked', async () => {
    render(ComponentUnderTest)
    const trigger = screen.getByRole('combobox')

    await user.click(trigger)

    expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Svelte' })).toBeInTheDocument()
  })
})
