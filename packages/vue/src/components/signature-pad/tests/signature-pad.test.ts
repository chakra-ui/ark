import { signaturePadAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { SignaturePad } from '..'
import { getExports, getParts } from '../../../setup-test'
import WithField from '../examples/with-field.vue'
import ComponentUnderTest from './signature-pad.test.vue'

describe('Signature Pad', () => {
  const renderedParts = getParts(signaturePadAnatomy).filter(
    (part) => !part.includes('[data-part="segment-path"]'),
  )

  it.each(renderedParts)('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.skip.each(getExports(signaturePadAnatomy))('should export %s', async (part) => {
    // @ts-expect-error
    expect(SignaturePad[part]).toBeDefined()
  })
})

describe('Signature Pad / Field', () => {
  it.skip('should set date signature pad as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
  })

  it.skip('should set signature pad as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    screen.debug()
    expect(screen.getByRole('application')).toHaveAttribute('aria-disabled', 'true')
  })

  it.skip('should set date picker as readonly', async () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByRole('application')).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(WithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('application')).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
