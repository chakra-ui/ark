import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import Counter from './counter.vue'

describe('Counter', () => {
  it('should increment value on click', async () => {
    const { getByText } = render(Counter)

    getByText('Times clicked: 0')

    const button = getByText('increment')

    await user.click(button)
    await user.click(button)

    getByText('Times clicked: 2')
  })
})
