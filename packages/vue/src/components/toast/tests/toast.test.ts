import { render, screen } from '@testing-library/vue'
import user from '@testing-library/user-event'
import AsChildComponentUnderTest from './toaster-as-child.test.vue'
import ComponentUnderTest from './toaster.test.vue'

describe('Toaster', () => {
  it('should render toasts inside the group', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByRole('button', { name: 'Show toast' }))

    const root = await screen.findByTestId('toast-root')
    expect(root).toHaveAttribute('data-part', 'root')
    expect(root).toHaveTextContent('Native group')
    expect(root.parentElement?.tagName).toBe('DIV')
    expect(root.parentElement).toHaveAttribute('data-part', 'group')
  })

  it('should use the slotted element as the group when using asChild', async () => {
    render(AsChildComponentUnderTest)

    await user.click(screen.getByRole('button', { name: 'Show toast' }))

    const group = await screen.findByTestId('group-host')
    expect(group.tagName).toBe('SECTION')
    expect(group).toHaveAttribute('data-scope', 'toast')
    expect(group).toHaveAttribute('data-part', 'group')
    expect(group).toHaveAttribute('role', 'region')
    expect(group).toHaveAttribute('aria-live', 'polite')
    expect(group.parentElement).not.toHaveAttribute('data-part', 'group')
  })
})
