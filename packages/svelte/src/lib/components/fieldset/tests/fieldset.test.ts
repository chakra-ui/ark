import { render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import FieldWithoutControlTest from './fieldset-field.test.svelte'
import TextareaTest from './fieldset-textarea.test.svelte'
import ComponentUnderTest from './fieldset.test.svelte'

describe('Fieldset', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should set textbox as disabled', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
    await waitFor(() => expect(screen.getByText('Label', { exact: true })).toHaveAttribute('data-disabled'))
  })

  it('should display helper text', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Fieldset Helper Text')).toBeInTheDocument()
  })

  it('should display error text when error is present', () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    expect(screen.getByText('Fieldset Error Text')).toBeVisible()
  })

  it('should not display error text when no error is present', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Fieldset Error Text')).not.toBeVisible()
  })

  it('should render aria-labelledby on the fieldset', async () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => expect(fieldset).toHaveAttribute('aria-labelledby', expect.stringContaining('legend')))
  })

  it('should have helper text accessible', () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    expect(fieldset).toBeInTheDocument()
    expect(fieldset).toHaveAccessibleDescription('Fieldset Helper Text')
  })

  it('should set aria-describedby with helper text', async () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => {
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('helper-text'))
    })
  })

  it('should set aria-describedby with error text when invalid', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => {
      const describedBy = fieldset.getAttribute('aria-describedby')
      expect(describedBy).toContain('error-text')
      expect(describedBy).toContain('helper-text')
    })
  })

  it('should render anatomy part attributes', () => {
    const { container } = render(ComponentUnderTest, { props: { invalid: true } })
    expect(container.querySelector('[data-fieldset-root]')).toBeInTheDocument()
    expect(container.querySelector('[data-fieldset-legend]')).toBeInTheDocument()
    expect(container.querySelector('[data-fieldset-helper-text]')).toBeInTheDocument()
    expect(container.querySelector('[data-fieldset-error-text]')).toBeInTheDocument()
  })

  it('should not re-render in a loop when a textarea with a value is nested', async () => {
    const onRender = vi.fn()
    render(TextareaTest, { props: { onRender } })

    expect(screen.getByRole('textbox', { name: 'Summary' })).toHaveValue('hello')
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(onRender.mock.calls.length).toBeGreaterThan(0)
    expect(onRender.mock.calls.length).toBeLessThan(10)
  })
})

describe('Fieldset / Field', () => {
  it('should disable a field without a tracked control', () => {
    render(FieldWithoutControlTest)
    expect(screen.getByTestId('field')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
  })
})
