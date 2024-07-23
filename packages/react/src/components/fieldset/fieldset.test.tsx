import { cleanup, render, screen } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { Field, Fieldset } from '../'
import { getExports, getParts } from '../../setup-test'
import { fieldsetAnatomy } from './fieldset.anatomy'

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

describe('Fieldset / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest invalid />)

  it.each(
    getParts(fieldsetAnatomy).filter(
      (part) => !part.includes('select') && !part.includes('textarea'),
    ),
  )('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fieldsetAnatomy))('should export %s', async (part) => {
    expect(Fieldset[part]).toBeDefined()
  })
})

describe('Fieldset', () => {
  afterEach(() => {
    cleanup()
  })

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
})
