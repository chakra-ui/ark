import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { axe } from 'vitest-axe'
import { Presence, type PresenceProps } from './'

const ComponentUnderTest = (props: PresenceProps) => {
  const [present, setPresent] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence present={present} {...props} data-testid="box">
        I am a red box
      </Presence>
    </>
  )
}

describe('Presence', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should control presence when not lazy mounting and not unmounting on exit', async () => {
    render(<ComponentUnderTest />)
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).toBeVisible())

    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.queryByTestId('box')).not.toBeVisible()
    })
  })

  it('should control presence when lazy mounting and not unmounting on exit', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).toBeVisible())

    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.queryByTestId('box')).not.toBeVisible()
    })
  })

  it('should control presence when not lazy mounting and unmounting on exit ', async () => {
    render(<ComponentUnderTest unmountOnExit />)
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).toBeVisible())

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeInTheDocument())
  })

  it('should control presence when lazy mounting and unmounting on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).toBeVisible())

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeInTheDocument())
  })
})
