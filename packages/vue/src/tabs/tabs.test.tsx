import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import Component from './stories/basic.stories.vue'

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

  it('handles focus and change events', async () => {
    const { getByRole, getByTestId, container } = render(Component)

    const changeTestId = getByTestId('change-content')
    // Making sure that this has not been fired
    expect(changeTestId).toHaveTextContent(/^Changed:$/)

    const tab1 = getByRole('tab', { name: 'Item one' })
    // Making sure this does not have focus
    expect(tab1).not.toHaveFocus()

    await user.click(tab1)
    expect(tab1).toHaveFocus()
    expect(changeTestId).toHaveTextContent('Changed: one')

    // User clicks away from tabs to lose focus, but change event does not fire
    await user.click(container)
    expect(tab1).not.toHaveFocus()
    expect(changeTestId).toHaveTextContent('Changed: one')

    // User gives focus back to tab one and changes focus to tab 3
    tab1.focus()
    expect(tab1).toHaveFocus()

    const tab3 = getByRole('tab', { name: 'Item three' })
    tab3.focus()
    expect(tab3).toHaveFocus()
    expect(changeTestId).toHaveTextContent('Changed: one')
  })

  it('should pass scoped slot props for `focusedValue` and `selectedValue`', async () => {
    render(Component, {
      props: {
        defaultValue: 'one',
      },
    })
    expect(screen.getByText('Value item one')).toBeVisible()

    const tab1 = screen.getByRole('tab', { name: 'Item one' })
    await user.click(tab1)

    const tablist = screen.getByTestId('tablist')
    expect(tablist.getAttribute('data-test-selected-value')).toBe('one')
    expect(tablist.getAttribute('data-test-focused-value')).toBe('one')

    await user.tab()
    const tab3 = screen.getByRole('tab', { name: 'Item three' })
    expect(tab3).toHaveFocus()
    expect(tablist.getAttribute('data-test-selected-value')).toBe('one')
    expect(tablist.getAttribute('data-test-focused-value')).toBe('three')
  })
})
