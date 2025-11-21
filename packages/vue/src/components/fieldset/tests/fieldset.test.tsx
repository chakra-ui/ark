import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './fieldset.test.vue'

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
    expect(screen.queryByText('Fieldset Error Text')).not.toBeInTheDocument()
  })

  it('should render aria-labelledby on the fieldset', async () => {
    render(ComponentUnderTest)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    expect(fieldset).toHaveAttribute('aria-labelledby', expect.stringContaining('legend'))
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
