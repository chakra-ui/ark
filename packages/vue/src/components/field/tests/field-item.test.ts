import { render, screen, waitFor } from '@testing-library/vue'
import user from '@testing-library/user-event'
import BasicTest from './field-item-basic.test.vue'
import MixedTest from './field-item-mixed.test.vue'
import DisabledTest from './field-item-disabled.test.vue'
import InvalidTest from './field-item-invalid.test.vue'
import OrphanItemTest from './field-item-orphan.test.vue'

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
        "label (id=v-0:label, for=v-0:item:amount)
        Field.Select (id=v-0:item:currency)
        Field.Input (id=v-0:item:amount)"
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
        "label (id=v-0:label, for=v-0:control)
        Field.Select (id=v-0:item:currency)
        Field.Input (id=v-0:control)"
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
  })

  it('should throw when Field.Item is used outside Field.Root', () => {
    expect(() => render(OrphanItemTest)).toThrow('Field.Item must be used within Field.Root')
  })
})
