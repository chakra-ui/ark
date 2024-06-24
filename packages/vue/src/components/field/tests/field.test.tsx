import { fieldAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Field } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './field.test.vue'

describe('Field', () => {
  it.each(
    getParts(fieldAnatomy).filter((part) => !part.includes('select') && !part.includes('textarea')),
  )('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fieldAnatomy))('should export %s', async (part) => {
    expect(Field[part]).toBeDefined()
  })

  it('should set textbox as required', async () => {
    render(ComponentUnderTest, { props: { required: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
  })

  it('should set textbox as disabled', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should set textbox as readonly', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Some additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: false } })
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
