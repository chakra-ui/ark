import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { nextTick } from 'vue'
import BasicComponentStory from '../stories/basic.stories.vue'
import ContextTestComponent from './context-test-component.vue'

describe('Slider', () => {
  it('should render', () => {
    render(BasicComponentStory)
  })

  it('should move the thumb correctly when orientated horizontal', async () => {
    const { getByRole } = render(BasicComponentStory, {
      props: { modelValue: 0 },
    })

    const thumb = getByRole('slider', { hidden: true })

    thumb.focus()

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '1')

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '2')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('should move the thumb correctly when orientated vertical', async () => {
    const { getByRole } = render(BasicComponentStory, {
      props: { orientation: 'vertical', modelValue: 0 },
    })

    const thumb = getByRole('slider', { hidden: true })
    thumb.focus()

    await user.keyboard('[ArrowUp]')
    expect(thumb).toHaveAttribute('aria-valuenow', '1')

    await user.keyboard('[ArrowDown]')
    expect(thumb).toHaveAttribute('aria-valuenow', '0')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('should move the thumb correctly under rtl ', async () => {
    const { getByRole } = render(BasicComponentStory, { props: { modelValue: 0, dir: 'rtl' } })

    const thumb = getByRole('slider', { hidden: true })

    thumb.focus()

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-1')

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-2')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('should expose context for Select', async () => {
    const { getByTestId } = render(ContextTestComponent)
    await nextTick()

    expect(getByTestId('slider-value')).toHaveTextContent('22')
  })

  it('should allow access to context with children render prop for SelectOutput', async () => {
    const { getByTestId } = render(ContextTestComponent)
    await nextTick()

    expect(getByTestId('slider-value')).toHaveTextContent('22')
  })
})
