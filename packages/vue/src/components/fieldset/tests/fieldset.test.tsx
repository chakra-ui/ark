import { render, screen } from '@testing-library/vue'
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
})
