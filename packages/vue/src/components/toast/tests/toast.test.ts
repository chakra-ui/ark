import { render, screen } from '@testing-library/vue'
import user from '@testing-library/user-event'
import AsChildComponentUnderTest from './toast-root-as-child.test.vue'

describe('Toast.Root', () => {
  it('should apply the root props to the slotted element when using asChild', async () => {
    render(AsChildComponentUnderTest)

    await user.click(screen.getByRole('button', { name: 'Show toast' }))

    const root = await screen.findByTestId('toast-host')
    expect(root.tagName).toBe('ARTICLE')
    expect(root).toHaveAttribute('data-scope', 'toast')
    expect(root).toHaveAttribute('data-part', 'root')
    expect(root).toHaveAttribute('role', 'status')
    expect(root).toHaveAttribute('id')
    expect(root).toHaveTextContent('Custom root')
    expect(document.querySelector('[data-ghost]')).toBeNull()
  })
})
