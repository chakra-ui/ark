import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import BasicStory from './stories/basic.stories.vue'
import ControlledStory from './stories/controlled.stories.vue'

describe('Rating Group', () => {
  it('should apply default value', () => {
    const { getByRole } = render(BasicStory, { props: { defaultValue: 2, max: 5 } })

    const input = getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should apply value', () => {
    const { getByRole } = render(BasicStory, { props: { value: 1, defaultValue: 2, max: 5 } })

    const input = getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('1')
  })

  it.todo('should trigger onChange on click')

  it('should change on a controlled click', async () => {
    const { getByText, getByRole, debug, baseElement } = render(ControlledStory)

    const button = getByText('Set to 5 stars')

    await user.click(button)

    const input = getByRole('textbox', { hidden: true })

    debug(baseElement)
    expect(input).toHaveValue('5')
  })
})
