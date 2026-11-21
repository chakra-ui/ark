import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './fieldset.test.vue'
import FieldWithoutControlTest from './fieldset-field.test.vue'

describe('Fieldset', () => {
  it('should set textbox as disabled', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Fieldset Helper Text')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    expect(screen.getByText('Fieldset Error Text')).toBeInTheDocument()
  })

  it('should not display error text when no error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: false } })
    expect(screen.getByText('Fieldset Error Text')).not.toBeVisible()
  })

  it('should render aria-labelledby on the fieldset', async () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => expect(fieldset).toHaveAttribute('aria-labelledby', expect.stringContaining('legend')))
  })

  it('should have helper text accessible', async () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    expect(fieldset).toBeInTheDocument()
    expect(screen.getByText('Fieldset Helper Text')).toBeInTheDocument()
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
})

describe('Fieldset / Field', () => {
  it('should disable a field without a tracked control', () => {
    render(FieldWithoutControlTest)
    expect(screen.getByTestId('field')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
  })
})
