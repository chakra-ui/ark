import { Collapsible } from '@ark-ui/react/collapsible'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { axe } from 'vitest-axe'

const ComponentUnderTest = (props: Collapsible.RootProps) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)

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

const HideModeUnderTest = (props: Collapsible.RootProps) => (
  <Collapsible.Root defaultOpen {...props}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      <EffectProbe />
    </Collapsible.Content>
  </Collapsible.Root>
)

describe('Collapsible', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should toggle', async () => {
    render(<ComponentUnderTest />)

    expect(screen.getByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should be fully controlled (true)', async () => {
    render(<ComponentUnderTest open={true} />)

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(<ComponentUnderTest open={false} />)

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitFor(() => expect(screen.getByText('Content')).not.toBeVisible())
  })

  it('should lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should unmount on exit ', async () => {
    render(<ComponentUnderTest unmountOnExit />)
    expect(screen.queryByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })

  it('keeps effects alive when hideMode is display-none', async () => {
    vi.useFakeTimers()
    render(<HideModeUnderTest hideMode="display-none" />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50)
    })

    const ticksWhenCollapsed = Number(screen.getByTestId('ticks').textContent)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBeGreaterThan(ticksWhenCollapsed)

    vi.useRealTimers()
  })

  it('pauses effects when hideMode is activity', async () => {
    vi.useFakeTimers()
    render(<HideModeUnderTest hideMode="activity" />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50)
    })

    const ticksWhenCollapsed = Number(screen.getByTestId('ticks').textContent)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    expect(Number(screen.getByTestId('ticks').textContent)).toBe(ticksWhenCollapsed)

    vi.useRealTimers()
  })
})
