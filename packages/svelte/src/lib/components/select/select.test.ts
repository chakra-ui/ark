import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'
import FieldComponent from './tests/select-field.test.svelte'
import HiddenInputComponent from './tests/select-hidden-input.test.svelte'

describe('Select', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render select with placeholder', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Select')).toBeInTheDocument()
    expect(screen.getByText('Framework')).toBeInTheDocument()
  })

  it('should open dropdown when clicked', async () => {
    render(ComponentUnderTest)
    const trigger = screen.getByRole('combobox')

    await user.click(trigger)

    expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Svelte' })).toBeInTheDocument()
  })

  it('should not leak the placeholder prop to the DOM', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Select')).not.toHaveAttribute('placeholder')
  })

  it('should describe the trigger with the helper and error text', async () => {
    render(FieldComponent)
    await waitFor(async () =>
      expect(await screen.findByRole('combobox', { name: 'Label' })).toHaveAccessibleDescription(
        'Additional Info Error Info',
      ),
    )
  })
  it('should submit the value through hidden inputs', async () => {
    render(HiddenInputComponent)
    const form = () => new FormData(screen.getByTestId('form') as HTMLFormElement)

    expect(form().getAll('framework')).toEqual([''])

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    await user.click(screen.getByRole('option', { name: 'Solid' }))
    await waitFor(() => expect(form().getAll('framework')).toEqual(['Solid']))
  })

  it('should submit one hidden input per value when multiple', async () => {
    render(HiddenInputComponent, { props: { multiple: true, defaultValue: ['React', 'Vue'] } })
    const form = new FormData(screen.getByTestId('form') as HTMLFormElement)

    expect(form.getAll('framework')).toEqual(['React', 'Vue'])
  })
})
