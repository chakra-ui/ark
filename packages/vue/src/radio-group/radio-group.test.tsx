import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import ComponentStory from './stories/disabled.stories.vue'

describe('Radio Group', () => {
  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()

    const { getByLabelText } = render(ComponentStory, { props: { onChange } })

    await user.click(getByLabelText('Grapes'))
    expect(onChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should invoke onChange if another value has selected', async () => {
    const onChange = vi.fn()

    const { getByLabelText } = render(ComponentStory, { props: { onChange } })

    await user.click(getByLabelText('Mangoes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
