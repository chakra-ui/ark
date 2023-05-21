import user from '@testing-library/user-event'
import { render, type RenderOptions } from '@testing-library/vue'
import BasicComponentStory from './stories/basic.stories.vue'

const TestComponentRender = (opts?: RenderOptions) => render(BasicComponentStory, opts)

describe('RangeSlider', () => {
  it('should render!', async () => {
    TestComponentRender()
  })

  it('should be possible to control it with the arrow keys', async () => {
    const { getAllByRole } = TestComponentRender()

    const [leftThumb, rightThumb] = getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '34')

    await user.keyboard('[ArrowLeft]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '33')

    rightThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '67')

    await user.keyboard('[ArrowLeft]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '66')
  })

  it('should not be possible to overlap the right thumb with the left thumb', async () => {
    const { getAllByRole } = TestComponentRender()

    const [leftThumb] = getAllByRole('slider', { hidden: true })
    leftThumb.focus()
    await user.keyboard('[End]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '66')

    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '66')
  })

  it('should be possible to control it with the arrow keys in rtl mode', async () => {
    const { getAllByRole } = TestComponentRender({ props: { dir: 'rtl' } })

    const [leftThumb, rightThumb] = getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '32')

    await user.keyboard('[ArrowLeft]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '33')

    rightThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '65')

    await user.keyboard('[ArrowLeft]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '66')
  })

  it('should be possible to control it with the arrow keys in vertical mode', async () => {
    const { getAllByRole } = TestComponentRender({ props: { orientation: 'vertical' } })

    const [leftThumb, rightThumb] = getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowUp]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '34')

    await user.keyboard('[ArrowDown]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '33')

    rightThumb.focus()
    await user.keyboard('[ArrowUp]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '67')

    await user.keyboard('[ArrowDown]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '66')
  })
})
