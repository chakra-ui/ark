import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import WithField from '../examples/with-field.vue'
import ComponentUnderTest from './rating-group.test.vue'

describe('Rating Group', () => {
  it('should apply default value', async () => {
    render(ComponentUnderTest, { props: { defaultValue: 2, count: 5 } })

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { defaultValue: 1, onValueChange, count: 5 } })

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(ComponentUnderTest, { props: { defaultValue: 0, count: 5 } })

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})

describe('Rating Group / Field', () => {
  it('should set rating group as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toBeRequired()
  })

  it('should set rating group as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toBeDisabled()
  })

  it('should set rating group as readonly', async () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(WithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on rating group when label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('radio', { name: /1 stars/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
