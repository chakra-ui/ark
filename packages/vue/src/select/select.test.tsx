import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import SelectStory from './select.story.vue'

/**
 * We occasionally wait for the component to render in between interactions
 */
const wait = (delay = 1000) => new Promise((resolve) => setTimeout(resolve, delay))

describe('Select', () => {
  it('should render', () => {
    render(SelectStory)
  })

  it('should show options on click', async () => {
    const { getByRole, getByText } = render(SelectStory)
    await wait(50)
    expect(getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    await user.click(getByText('Select'))
    await wait(50)
    expect(getByRole('option', { name: 'React' })).toBeVisible()
  })

  it('should allow to select an option', async () => {
    const { getByRole, getByText, queryByText } = render(SelectStory)
    await wait(50)
    expect(getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    await user.click(getByText('Select'))
    await wait(50)

    await user.click(getByRole('option', { name: 'React' }))
    await wait(50)
    expect(queryByText('Select')).not.toBeInTheDocument()
  })
})
