import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import BasicTest from './field-item-basic.test.svelte'
import MixedTest from './field-item-mixed.test.svelte'
import DisabledTest from './field-item-disabled.test.svelte'
import InvalidTest from './field-item-invalid.test.svelte'
import OrphanItemTest from './field-item-orphan.test.svelte'
import CustomControlTest from './field-item-custom-control.test.svelte'
import NumberInputTest from './field-item-number-input.test.svelte'
import TargetTest from './field-item-target.test.svelte'
import ItemLabelTest from './field-item-label.test.svelte'

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
    const { container } = render(BasicTest)
    await waitFor(() => {
      const root = container.firstElementChild!
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-field-label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('select[data-field-control]') },
        { name: 'Field.Input', element: root.querySelector('input[data-field-control]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=c1:label, for=c1:item:amount)
        Field.Select (id=c1:item:currency)
        Field.Input (id=c1:item:amount)"
      `)
    })
  })

  it('should focus the target input when label is clicked', async () => {
    render(BasicTest)
    await user.click(screen.getByText('Amount'))
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('should work when mixing Field.Item with a direct control under Field.Root', async () => {
    const { container } = render(MixedTest)
    await waitFor(() => {
      const root = container.firstElementChild!
      const structure = formatFieldParts([
        { name: 'label', element: root.querySelector('[data-field-label]'), attrs: ['id', 'for'] },
        { name: 'Field.Select', element: root.querySelector('select[data-field-control]') },
        { name: 'Field.Input', element: root.querySelector('input[data-field-control]') },
      ])
      expect(structure).toMatchInlineSnapshot(`
        "label (id=c3:label, for=c3:control)
        Field.Select (id=c3:item:currency)
        Field.Input (id=c3:control)"
      `)
    })

    await user.click(screen.getByText('Amount'))
    expect(screen.getByTestId('amount-input')).toHaveFocus()
  })

  it('should propagate disabled state to items', () => {
    render(DisabledTest)
    expect(screen.getByTestId('currency-select')).toBeDisabled()
    expect(screen.getByTestId('amount-input')).toBeDisabled()
    expect(screen.getByText('Amount')).toHaveAttribute('data-disabled')
  })

  it('should propagate invalid state to items', () => {
    render(InvalidTest)
    expect(screen.getByTestId('amount-input')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByTestId('amount-input')).toHaveAttribute('data-invalid')
    expect(screen.getByText('Invalid amount')).toBeInTheDocument()
    expect(screen.getByTestId('amount-input')).toHaveAccessibleDescription(expect.stringContaining('Invalid amount'))
  })

  it('should throw when Field.Item is used outside Field.Root', () => {
    expect(() => render(OrphanItemTest)).toThrow('Field.Item must be used within Field.Root')
  })
})

describe('Field / Item / controls', () => {
  it('should scope control id for custom controls via Field.Context', () => {
    render(CustomControlTest)
    const input = screen.getByTestId('custom-input')
    expect(input.id).toContain(':item:custom')
    expect(screen.getByText('Custom')).toHaveAttribute('for', input.id)
  })

  it('should work with NumberInput inside Field.Item', async () => {
    render(NumberInputTest)
    const input = screen.getByTestId('number-input')
    expect(input.id).toContain(':item:amount')

    await user.click(screen.getByText('Amount'))
    expect(input).toHaveFocus()
  })

  it('should focus the item control when mixing Field.Item with a direct control and target is set', async () => {
    render(TargetTest)
    const select = screen.getByTestId('currency-select')
    const input = screen.getByTestId('amount-input')

    expect(select.id).toMatch(/:item:currency$/)
    expect(input.id).toMatch(/:control$/)
    expect(screen.getByText('Currency')).toHaveAttribute('for', select.id)

    await user.click(screen.getByText('Currency'))
    expect(select).toHaveFocus()
  })
})

describe('Field.Item label', () => {
  it('should label the item control with a label inside the item', async () => {
    render(ItemLabelTest)
    const input = screen.getByRole('textbox', { name: 'Amount' })
    expect(input.id).toMatch(/:item:amount$/)
    expect(screen.getByText('Amount', { exact: true })).toHaveAttribute('for', input.id)

    await user.click(screen.getByText('Amount', { exact: true }))

    expect(input).toHaveFocus()
  })
})
