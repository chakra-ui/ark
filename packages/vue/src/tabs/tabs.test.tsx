import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import Component from './stories/basic.story.vue'

describe('Tabs', () => {
  it('should render', () => {
    render(Component)
  })

  it('should show the active panel and hide other panels', async () => {
    render(Component)
    const tab2 = screen.getByRole('tab', { name: 'Item two' })
    await user.click(tab2)
    // Because tab 2 is disabled, there should be no change in state
    expect(screen.getByText('Value item two')).not.toBeVisible()

    const tab1 = screen.getByRole('tab', { name: 'Item one' })
    await user.click(tab1)

    expect(screen.getByText('Value item one')).toBeVisible()

    const tab3 = screen.getByRole('tab', { name: 'Item three' })
    await user.click(tab3)

    expect(screen.getByText('Value item one')).not.toBeVisible()
    expect(screen.getByText('Value item three')).toBeVisible()
  })

  it('should show content of the default value', () => {
    render(Component, {
      props: {
        defaultValue: 'two',
      },
    })
    expect(screen.getByText('Value item two')).toBeVisible()
  })
})
