import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Field, fieldAnatomy } from '../'
import { getExports, getParts } from '../../setup-test'

const ComponentUnderTest = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Field.Label>
      Label
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)

describe('Field / Parts & Exports', () => {
  it.each(
    getParts(fieldAnatomy).filter((part) => !part.includes('select') && !part.includes('textarea')),
  )('should render part %s', async (part) => {
    render(() => <ComponentUnderTest invalid required />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fieldAnatomy))('should export %s', async (part) => {
    expect(Field[part]).toBeDefined()
  })
})

describe('Field / Input', () => {
  it('should set textbox as required', async () => {
    render(() => <ComponentUnderTest required />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set textbox as disabled', async () => {
    render(() => <ComponentUnderTest disabled />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should set textbox as readonly', async () => {
    render(() => <ComponentUnderTest readOnly />)
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Some additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(() => <ComponentUnderTest invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(() => <ComponentUnderTest />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
