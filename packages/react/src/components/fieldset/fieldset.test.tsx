import { render, screen, waitFor } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Field, Fieldset } from '../'

const ComponentUnderTest = (props: Fieldset.RootProps) => (
  <Fieldset.Root {...props}>
    <Fieldset.Legend>Legend</Fieldset.Legend>
    <Fieldset.HelperText>Fieldset Helper Text</Fieldset.HelperText>
    <Fieldset.ErrorText>Fieldset Error Text</Fieldset.ErrorText>
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Field.Input />
      <Field.HelperText>Field Helper Text</Field.HelperText>
      <Field.ErrorText>Field Error Text</Field.ErrorText>
    </Field.Root>
  </Fieldset.Root>
)

describe('Fieldset', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should set textbox as disabled', async () => {
    render(<ComponentUnderTest disabled />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('Fieldset Helper Text')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<ComponentUnderTest invalid />)
    expect(screen.getByText('Fieldset Error Text')).toBeInTheDocument()
  })

  it('should not display error text when no error is present', async () => {
    render(<ComponentUnderTest />)
    expect(screen.queryByText('Fieldset Error Text')).not.toBeInTheDocument()
  })

  it('should render aria-labelledby on the fieldset', async () => {
    render(<ComponentUnderTest />)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    expect(fieldset).toHaveAttribute('aria-labelledby', expect.stringContaining('legend'))
  })

  it('should have helper text accessible', async () => {
    render(<ComponentUnderTest />)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    expect(fieldset).toBeInTheDocument()
    expect(screen.getByText('Fieldset Helper Text')).toBeInTheDocument()
  })

  it('should set aria-describedby with helper text', async () => {
    render(<ComponentUnderTest />)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => {
      expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('helper-text'))
    })
  })

  it('should set aria-describedby with error text when invalid', async () => {
    render(<ComponentUnderTest invalid />)
    const fieldset = screen.getByRole('group', { name: /legend/i })
    await waitFor(() => {
      const describedBy = fieldset.getAttribute('aria-describedby')
      expect(describedBy).toContain('error-text')
      expect(describedBy).toContain('helper-text')
    })
  })
})
