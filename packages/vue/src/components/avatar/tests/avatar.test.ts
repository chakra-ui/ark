import { render, screen } from '@testing-library/vue'
import AsChildComponentUnderTest from './avatar-as-child.test.vue'

describe('Avatar', () => {
  it('should render the slotted element when Image uses asChild', () => {
    render(AsChildComponentUnderTest)

    const image = screen.getByTestId('image')
    expect(image).toHaveAttribute('data-avatar-image')
    expect(image).toHaveAttribute('src', 'https://i.pravatar.cc/300')
  })
})
