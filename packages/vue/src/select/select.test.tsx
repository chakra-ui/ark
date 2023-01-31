import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import SelectStory from './select.story.vue'

describe('Select', () => {
  it('should render', () => {
    render(SelectStory)
  })

  it.skip('should show options on click', async () => {
    const { getByRole, getByText } = render(SelectStory)

    expect(getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    await user.click(getByText('Select'))
    expect(getByRole('option', { name: 'React' })).toBeVisible()
  })

  it.skip('should allow to select an option', async () => {
    const { getByRole, getByText, queryByText } = render(SelectStory)
    expect(getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    await user.click(getByText('Select'))

    await user.click(getByRole('option', { name: 'React' }))
    expect(queryByText('Select')).not.toBeInTheDocument()
  })
})
