import { render, screen } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import ComponentUnderTest from './render-state.test.svelte'

describe('Collapsible / render state', () => {
  it('should forward the part state to the render snippet', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByTestId('trigger')
    expect(trigger).toHaveTextContent('Closed')

    await user.click(trigger)
    expect(trigger).toHaveTextContent('Open')
  })
})
