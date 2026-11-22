import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as FollowCursor } from '../examples/follow-cursor.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

test('the follow cursor tooltip opens on hover', async () => {
  mount(FollowCursor)
  const tooltip = document.querySelector('ark-tooltip')!
  await tooltip.ready

  await user.hover(screen.getByRole('button', { name: 'Hover Me' }))

  await waitFor(() => expect(tooltip.open).toBe(true))
  expect(screen.getByText('I follow your cursor')).toBeVisible()
})
