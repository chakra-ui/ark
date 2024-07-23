import { render, screen } from '@testing-library/vue'
import { Fieldset, fieldsetAnatomy } from '..'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './fieldset.test.vue'

describe('Fieldset', () => {
  it.each(
    getParts(fieldsetAnatomy).filter(
      (part) => !part.includes('select') && !part.includes('textarea'),
    ),
  )('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fieldsetAnatomy))('should export %s', async (part) => {
    expect(Fieldset[part]).toBeDefined()
  })

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
