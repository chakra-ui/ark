import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useEffect, useState } from 'react'
import { axe } from 'vitest-axe'
import { Presence, type PresenceProps } from '@ark-ui/react/presence'

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

const EffectProbe = () => {
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTicks((count) => count + 1)
    }, 100)
    return () => window.clearInterval(id)
  }, [])

  return <span data-testid="ticks">{ticks}</span>
}

const HideModeUnderTest = (props: PresenceProps) => {
  const [present, setPresent] = useState(true)
  return (
    <>
      <button type="button" onClick={() => setPresent((value) => !value)}>
        Toggle
      </button>
      <Presence present={present} {...props} data-testid="box">
        <EffectProbe />
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

  it('keeps effects alive when hideMode is display-none', async () => {
    vi.useFakeTimers()
    render(<HideModeUnderTest hideMode="display-none" />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })
    const ticksWhileOpen = Number(screen.getByTestId('ticks').textContent)
    expect(ticksWhileOpen).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button'))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50)
    })
    expect(screen.getByTestId('box')).toHaveAttribute('data-state', 'closed')
    expect(screen.getByTestId('box')).toHaveAttribute('hidden')

    const ticksWhenHidden = Number(screen.getByTestId('ticks').textContent)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBeGreaterThan(ticksWhenHidden)

    vi.useRealTimers()
  })

  it('pauses effects when hideMode is activity', async () => {
    vi.useFakeTimers()
    render(<HideModeUnderTest hideMode="activity" />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })
    const ticksWhileOpen = Number(screen.getByTestId('ticks').textContent)
    expect(ticksWhileOpen).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button'))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50)
    })
    expect(screen.getByTestId('box')).toHaveAttribute('data-state', 'closed')
    expect(screen.getByTestId('box')).not.toHaveAttribute('hidden')

    const ticksWhenHidden = Number(screen.getByTestId('ticks').textContent)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBe(ticksWhenHidden)

    vi.useRealTimers()
  })
})
