import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { createSignal, flush } from 'solid-js'
import { Field } from '@ark-ui/solid/field'

const ComponentUnderTest = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Field.Label>
      Label
      <Field.Indicator type="required">*</Field.Indicator>
    </Field.Label>
    <Field.Input />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)

describe('Field / Input', () => {
  it('should set textbox as required', async () => {
    render(() => <ComponentUnderTest required />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set textbox as disabled', async () => {
    render(() => <ComponentUnderTest disabled />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
    expect(document.querySelector('[data-field-root]')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Some additional Info')).toHaveAttribute('data-disabled')
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
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(expect.stringContaining('Error Info')),
    )
  })

  it('should focus on input when label is clicked', async () => {
    render(() => <ComponentUnderTest />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Error Info')).not.toBeVisible()
  })

  it('should set aria-describedby to the ids of the error and helper text', async () => {
    render(() => <ComponentUnderTest />)
    const textbox = screen.getByRole('textbox', { name: /label/i })
    await waitFor(() => expect(textbox).toHaveAttribute('aria-describedby'))
  })
})

describe('Field / Item', () => {
  function formatFieldParts(parts: Array<{ name: string; element: Element | null; attrs?: string[] }>): string {
    return parts
      .filter((p) => p.element)
      .map((p) => {
        const el = p.element as Element
        const attrList = (p.attrs ?? ['id'])
          .map((a) => `${a}=${a === 'id' ? (el as HTMLElement).id : el.getAttribute(a)}`)
          .join(', ')
        return `${p.name} (${attrList})`
      })
      .join('\n')
  }

  it('should render the correct html structure', async () => {
    const { container } = render(() => (
      <Field.Root target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <Field.Input />
        </Field.Item>
        <Field.HelperText>Enter the amount</Field.HelperText>
      </Field.Root>
    ))
    await waitFor(() => {
      const root = container.firstElementChild!
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-field-label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('select[data-field-control]') },
        { name: 'Field.Input', element: root.querySelector('input[data-field-control]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=cl-8:label, for=cl-8:item:amount)
        Field.Select (id=cl-8:item:currency)
        Field.Input (id=cl-8:item:amount)"
      `)
    })
  })

  it('should focus the target input when label is clicked', async () => {
    render(() => (
      <Field.Root target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <Field.Input />
        </Field.Item>
      </Field.Root>
    ))
    await user.click(screen.getByText('Amount'))
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('should work when mixing Field.Item with a direct control under Field.Root', async () => {
    const { container } = render(() => (
      <Field.Root>
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select data-testid="currency-select">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Field.Select>
        </Field.Item>
        <Field.Input data-testid="amount-input" />
        <Field.HelperText>Enter the amount</Field.HelperText>
      </Field.Root>
    ))
    await waitFor(() => {
      const root = container.firstElementChild!
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-field-label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('select[data-field-control]') },
        { name: 'Field.Input', element: root.querySelector('input[data-field-control]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=cl-10:label, for=cl-10:control)
        Field.Select (id=cl-10:item:currency)
        Field.Input (id=cl-10:control)"
      `)
    })

    await user.click(screen.getByText('Amount'))
    expect(screen.getByTestId('amount-input')).toHaveFocus()
  })

  it('should propagate disabled state to items', () => {
    render(() => (
      <Field.Root disabled target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select data-testid="currency-select">
            <option value="USD">USD</option>
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <Field.Input data-testid="amount-input" />
        </Field.Item>
      </Field.Root>
    ))
    expect(screen.getByTestId('currency-select')).toBeDisabled()
    expect(screen.getByTestId('amount-input')).toBeDisabled()
    expect(screen.getByText('Amount')).toHaveAttribute('data-disabled')
  })

  it('should propagate invalid state to items', () => {
    render(() => (
      <Field.Root invalid target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="amount">
          <Field.Input data-testid="amount-input" />
        </Field.Item>
        <Field.ErrorText>Invalid amount</Field.ErrorText>
      </Field.Root>
    ))
    expect(screen.getByTestId('amount-input')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByTestId('amount-input')).toHaveAttribute('data-invalid')
    expect(screen.getByText('Invalid amount')).toBeInTheDocument()
  })

  it('should work with NumberInput inside Field.Item', async () => {
    const { NumberInput } = await import('@ark-ui/solid/number-input')

    render(() => (
      <Field.Root target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select data-testid="currency-select">
            <option value="USD">USD</option>
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <NumberInput.Root>
            <NumberInput.Input data-testid="number-input" />
          </NumberInput.Root>
        </Field.Item>
        <Field.HelperText>Enter the amount</Field.HelperText>
      </Field.Root>
    ))

    const input = screen.getByTestId('number-input')
    expect(input.id).toContain(':item:amount')

    await user.click(screen.getByText('Amount'))
    expect(input).toHaveFocus()
  })

  it('should update Field.Context inside Field.Item when invalid changes', async () => {
    const [invalid, setInvalid] = createSignal(false)

    render(() => (
      <Field.Root invalid={invalid()} target="amount">
        <Field.Item value="amount">
          <Field.Input data-testid="amount-input" />
          <Field.Context>{(field) => <span data-testid="invalid">{String(field().invalid)}</span>}</Field.Context>
        </Field.Item>
      </Field.Root>
    ))

    expect(screen.getByTestId('invalid')).toHaveTextContent('false')
    expect(screen.getByTestId('amount-input')).not.toHaveAttribute('aria-invalid')

    setInvalid(true)
    flush()

    expect(screen.getByTestId('invalid')).toHaveTextContent('true')
    expect(screen.getByTestId('amount-input')).toHaveAttribute('aria-invalid', 'true')
  })

  it('should throw when Field.Item is used outside Field.Root', () => {
    expect(() =>
      render(() => (
        <Field.Item value="amount">
          <Field.Input />
        </Field.Item>
      )),
    ).toThrow('Field.Item must be used within Field.Root')
  })
})

describe('Field / ids', () => {
  it('should give ids.root to the root and ids.control to the control', () => {
    render(() => <ComponentUnderTest ids={{ root: 'custom-root', control: 'custom-control' }} />)
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('id', 'custom-control')
    expect(document.getElementById('custom-root')).toHaveAttribute('data-field-root')
  })

  it('should point the label at ids.control, which overrides target', () => {
    render(() => (
      <Field.Root target="amount" ids={{ control: 'custom-control' }}>
        <Field.Label>Amount</Field.Label>
        <Field.Input />
      </Field.Root>
    ))
    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('id', 'custom-control')
  })
})

describe('Field / Props', () => {
  it('should keep the generated id when id is passed as undefined', () => {
    render(() => (
      <Field.Root id={undefined}>
        <Field.Label>Label</Field.Label>
        <Field.Input />
      </Field.Root>
    ))
    expect(screen.getByRole('textbox', { name: 'Label' }).id).not.toContain('undefined')
  })
})
