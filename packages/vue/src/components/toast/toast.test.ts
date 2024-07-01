import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './examples/basic.vue'
import { toastAnatomy } from './toast.anatomy'

describe('Toast', () => {
  it.each(getParts(toastAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Create Toast'))

    expect(document.querySelector(part)).toBeInTheDocument()
    await user.click(screen.getByText('Close'))
  })

  it('should show and hide a toast message', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())

    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('Description')).not.toBeInTheDocument())
  })
})
