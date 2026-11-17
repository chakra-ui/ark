import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './navigation-menu.test.vue'

describe('NavigationMenu', () => {
  it('should close the menu when a link is clicked', async () => {
    const { emitted } = render(ComponentUnderTest, { props: { defaultValue: 'overview' } })

    await user.click(screen.getByRole('link', { name: 'Quick Start' }))

    await waitFor(() => expect(emitted('update:value')).toEqual([['']]))
  })
})
