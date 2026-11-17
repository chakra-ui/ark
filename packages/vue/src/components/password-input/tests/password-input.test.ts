import { render, screen } from '@testing-library/vue'
import AsChildComponentUnderTest from './password-input-as-child.test.vue'

describe('PasswordInput', () => {
  it('should render the slotted element when Input uses asChild', () => {
    render(AsChildComponentUnderTest)

    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('data-scope', 'password-input')
    expect(input).toHaveAttribute('data-part', 'input')
    expect(input).toHaveAttribute('type', 'password')
  })
})
