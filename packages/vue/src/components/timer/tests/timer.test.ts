import { render, screen } from '@testing-library/vue'
import ItemAsChildComponentUnderTest from './timer-item-as-child.test.vue'

describe('Timer', () => {
  it('should render the formatted value by default', () => {
    render(ItemAsChildComponentUnderTest)

    expect(screen.getByTestId('item')).toHaveTextContent('12')
  })

  it('should render the slotted element when Item uses asChild', () => {
    render(ItemAsChildComponentUnderTest)

    const item = screen.getByTestId('item-as-child')
    expect(item.tagName).toBe('SPAN')
    expect(item).toHaveTextContent('12')
    expect(item).toHaveAttribute('data-scope', 'timer')
    expect(item).toHaveAttribute('data-part', 'item')
    expect(item).toHaveAttribute('data-type', 'seconds')
  })
})
