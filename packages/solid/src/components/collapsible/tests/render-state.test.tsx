import { Collapsible } from '@ark-ui/solid/collapsible'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'

const ComponentUnderTest = () => (
  <Collapsible.Root>
    <Collapsible.Trigger
      render={(props, state) => (
        <button type="button" {...props}>
          {state().open ? 'Open' : 'Closed'}
        </button>
      )}
    />
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)

describe('Collapsible / render state', () => {
  it('should forward the part state to the render function', async () => {
    render(() => <ComponentUnderTest />)

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent('Closed')

    await user.click(trigger)
    expect(trigger).toHaveTextContent('Open')
  })
})
