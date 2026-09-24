import { render, screen } from '@testing-library/vue'
import AsChildComponentUnderTest from './password-input-as-child.test.vue'

describe('PasswordInput', () => {
  it('should render the slotted element when Input uses asChild', () => {
    render(AsChildComponentUnderTest)

    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('data-password-input-input')
    expect(input).toHaveAttribute('type', 'password')
  })
})
