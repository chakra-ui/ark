import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Field } from '../'

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

describe('Field / Input', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should set textbox as required', async () => {
    render(<ComponentUnderTest required />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set textbox as disabled', async () => {
    render(<ComponentUnderTest disabled />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
    expect(document.querySelector('[data-part="root"]')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Some additional Info')).toHaveAttribute('data-disabled')
  })

  it('should set textbox as readonly', async () => {
    render(<ComponentUnderTest readOnly />)
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('Some additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<ComponentUnderTest invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<ComponentUnderTest />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })

  it('should set aria-describedby to the ids of the error and helper text', async () => {
    render(<ComponentUnderTest />)
    const textbox = screen.getByRole('textbox', { name: /label/i })
    await waitFor(() => expect(textbox).toHaveAttribute('aria-describedby'))
  })
})

describe('Field / Item', () => {
  const ItemTest = () => (
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
  )

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
    const { container } = render(<ItemTest />)
    await waitFor(() => {
      const root = container.firstElementChild
      if (!root) throw new Error('Expected root element')
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-part=label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('[data-part=select]') },
        { name: 'Field.Input', element: root.querySelector('[data-part=input]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=field::_r_9_::label, for=field::_r_9_::item::amount)
        Field.Select (id=field::_r_9_::item::currency)
        Field.Input (id=field::_r_9_::item::amount)"
      `)
    })
  })

  it('should focus the target input when label is clicked', async () => {
    render(<ItemTest />)
    await user.click(screen.getByText('Amount'))
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('should scope control id for custom controls via Field.Context', () => {
    const CustomControlTest = () => (
      <Field.Root target="custom">
        <Field.Label>Custom</Field.Label>
        <Field.Item value="custom">
          <Field.Context>
            {(context) => <input data-testid="custom-input" {...context.getInputProps()} />}
          </Field.Context>
        </Field.Item>
      </Field.Root>
    )
    render(<CustomControlTest />)
    const input = screen.getByTestId('custom-input')
    expect(input.id).toContain('item::custom')
    expect(screen.getByText('Custom')).toHaveAttribute('for', input.id)
  })

  it('should work when mixing Field.Item with a direct control under Field.Root', async () => {
    const MixedTest = () => (
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
    )
    const { container } = render(<MixedTest />)

    await waitFor(() => {
      const root = container.firstElementChild
      if (!root) throw new Error('Expected root element')
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-part=label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('[data-part=select]') },
        { name: 'Field.Input', element: root.querySelector('[data-part=input]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=field::_r_c_::label, for=_r_c_)
        Field.Select (id=field::_r_c_::item::currency)
        Field.Input (id=_r_c_)"
      `)
    })

    // label points to the root control (no target set)
    await user.click(screen.getByText('Amount'))
    expect(screen.getByTestId('amount-input')).toHaveFocus()
  })

  it('should focus the item control when mixing Field.Item with a direct control and target is set', async () => {
    const MixedWithTargetTest = () => (
      <Field.Root target="currency">
        <Field.Label>Currency</Field.Label>
        <Field.Item value="currency">
          <Field.Select data-testid="currency-select">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Field.Select>
        </Field.Item>
        <Field.Input data-testid="amount-input" />
        <Field.HelperText>Select a currency</Field.HelperText>
      </Field.Root>
    )
    const { container } = render(<MixedWithTargetTest />)

    await waitFor(() => {
      const root = container.firstElementChild
      if (!root) throw new Error('Expected root element')
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-part=label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('[data-part=select]') },
        { name: 'Field.Input', element: root.querySelector('[data-part=input]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=field::_r_d_::label, for=field::_r_d_::item::currency)
        Field.Select (id=field::_r_d_::item::currency)
        Field.Input (id=_r_d_)"
      `)
    })

    // label points to the item control (target set to "currency")
    await user.click(screen.getByText('Currency'))
    expect(screen.getByTestId('currency-select')).toHaveFocus()
  })

  it('should propagate disabled state to items', () => {
    render(
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
      </Field.Root>,
    )
    expect(screen.getByTestId('currency-select')).toBeDisabled()
    expect(screen.getByTestId('amount-input')).toBeDisabled()
    expect(screen.getByText('Amount')).toHaveAttribute('data-disabled')
  })

  it('should propagate invalid state to items', () => {
    render(
      <Field.Root invalid target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="amount">
          <Field.Input data-testid="amount-input" />
        </Field.Item>
        <Field.ErrorText>Invalid amount</Field.ErrorText>
      </Field.Root>,
    )
    expect(screen.getByTestId('amount-input')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByTestId('amount-input')).toHaveAttribute('data-invalid')
    expect(screen.getByText('Invalid amount')).toBeInTheDocument()
  })

  it('should work with NumberInput inside Field.Item', async () => {
    const { NumberInput } = await import('@ark-ui/react/number-input')

    render(
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
      </Field.Root>,
    )

    const input = screen.getByTestId('number-input')
    expect(input.id).toContain('item::amount')

    await user.click(screen.getByText('Amount'))
    expect(input).toHaveFocus()
  })

  it('should throw when Field.Item is used outside Field.Root', () => {
    expect(() =>
      render(
        <Field.Item value="amount">
          <Field.Input />
        </Field.Item>,
      ),
    ).toThrow('Field.Item must be used within Field.Root')
  })
})
