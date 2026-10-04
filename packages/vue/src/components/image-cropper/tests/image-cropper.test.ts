import { render, screen } from '@testing-library/vue'
import { ImageCropper } from '../index.ts'
import AsChildComponentUnderTest from './image-cropper-as-child.test.vue'

describe('ImageCropper', () => {
  it('should render the slotted element when Image uses asChild', () => {
    render(AsChildComponentUnderTest)

    const image = screen.getByTestId('image')
    expect(image).toHaveAttribute('data-scope', 'image-cropper')
    expect(image).toHaveAttribute('data-part', 'image')
  })

  it('should forward root props to the machine', () => {
    render(ImageCropper.Root, {
      props: { fixedCropArea: true, cropShape: 'circle' },
      attrs: { 'data-testid': 'root' },
    })

    const root = screen.getByTestId('root')
    expect(root).toHaveAttribute('data-fixed')
    expect(root).toHaveAttribute('data-shape', 'circle')
  })

  it('should not set fixedCropArea when omitted', () => {
    render(ImageCropper.Root, { attrs: { 'data-testid': 'root' } })

    expect(screen.getByTestId('root')).not.toHaveAttribute('data-fixed')
  })
})
