import { render, screen } from '@testing-library/vue'
import AsChildComponentUnderTest from './image-cropper-as-child.test.vue'

describe('ImageCropper', () => {
  it('should render the slotted element when Image uses asChild', () => {
    render(AsChildComponentUnderTest)

    const image = screen.getByTestId('image')
    expect(image).toHaveAttribute('data-scope', 'image-cropper')
    expect(image).toHaveAttribute('data-part', 'image')
  })
})
