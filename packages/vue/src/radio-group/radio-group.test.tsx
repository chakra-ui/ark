import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import ComponentStory from './stories/disabled.stories.vue'

describe('Radio Group', () => {
  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()

    const { getByLabelText } = render(ComponentStory, { props: { onValueChange } })

    await user.click(getByLabelText('Grapes'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()

    const { getByLabelText } = render(ComponentStory, { props: { onValueChange } })

    await user.click(getByLabelText('Mangoes'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
