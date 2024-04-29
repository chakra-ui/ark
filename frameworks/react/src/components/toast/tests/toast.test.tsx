import { toastAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Toast / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(toastAnatomy))('should render part! %s', async (part) => {
    await user.click(screen.getByText('Create Toast'))

    expect(document.querySelector(part)).toBeInTheDocument()
  })
})

describe('Toast', () => {
  afterEach(() => {
    cleanup()
  })

  it('should show and hide a toast message', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())
    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
  })
})
